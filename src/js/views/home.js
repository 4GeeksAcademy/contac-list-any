import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import Card from "../component/Card.jsx";
import { useNavigate } from "react-router";
import { ContactContext } from "../component/contactContext.js";

export const Home = () => {
    const { contacts, setContacts } = useContext(ContactContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://playground.4geeks.com/contact/agendas/Any", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        });
    }, []);

    useEffect(() => {
        fetch("https://playground.4geeks.com/contact/agendas/Any/contacts")
            .then((response) => response.json())
            .then((data) => setContacts(data.contacts))
            .catch((error) => console.error('Error fetching contacts:', error));
    }, [setContacts]);

    return (
        <>
            <button className="btn-a btn-info" onClick={() => navigate("/addcontact")}>Add a new contact</button>         
            {contacts && contacts.map((element, index) => {
                return (
                    <Card
                        key={index}
                        id={element.id}
                        name={element.name}
                        address={element.address}
                        phone={element.phone}
                        email={element.email}
                    />
                );
            })}
        </>
    );
};