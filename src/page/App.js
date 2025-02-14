import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import SingleContact from "./singleContact.jsx";
import '../App.css';

function App() {

const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getContacts();
  }, []);

  console.log(store.contactList);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="text-end my-2">
              <Link to="/add" type="button" className="btn btn-success">
                Agregar Contacto
              </Link>
            </div>

            <ul className="mb-3">
              {store.contactList &&
                store.contactList.length > 0 &&
                store.contactList.map((contact, index) => {
                  return <SingleContact contact={contact} key={index} />;
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
