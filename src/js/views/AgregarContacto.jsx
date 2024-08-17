import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactContext } from "../component/contactContext.js";

const ContactForm = () => {
    const { contacts, setContacts } = useContext(ContactContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (id) {
            const contact = contacts.find(contact => contact.id === parseInt(id));
            if (contact) {
                setFullName(contact.name); 
                setEmail(contact.email);
                setPhone(contact.phone);
                setAddress(contact.address);
            }
        }
    }, [id, contacts]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fullName || !email || !phone || !address) {
            console.error('All fields are required');
            return;
        }

        const newContact = {
            name: fullName, 
            email: email,
            phone: phone,
            address: address,
            agenda_slug: "Any"
        };

        const url = id 
            ? `https://playground.4geeks.com/contact/agendas/Any/contacts${id}`  
            : "https://playground.4geeks.com/contact/agendas/Any/contacts";

        const method = id ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newContact)
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    console.error('Validation Error:', error);
                    throw new Error(`Error: ${error.detail[0].msg}`);
                });
            }
            return response.json();
        })
        .then((data) => {
            if (id) {
                setContacts(contacts.map(contact => contact.id === parseInt(id) ? data : contact));
            } else {
                setContacts([...contacts, data]);
            }
            navigate("/");
        })
        .catch((error) => console.error('Error creating contact:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>{id ? "Edit Contact" : "Add a new contact"}</h1>
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <button type="submit" className="btn-c btn-primary fw-bold">{id ? "Update" : "Save"}</button>
            <button type="button" className="btn-b btn-secondary" onClick={() => navigate("/")}>or get back to contacts</button>
        </form>
    );
};

export default ContactForm;
