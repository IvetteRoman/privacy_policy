import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

function User() {
    const [user, setUser] = useState({});
    const [verify, setVerify] = useState(false);
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showRefuseModal, setShowRefuseModal] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/user/${id}`)
            .then((response) => {
                const userData = response.data;
                setUser(userData);
            })
            .catch((error) => {
                console.error("Error al cargar datos del usuario:", error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:3001/verify/${id}`)
            .then((response) => {
                const userData = response.data;
                setVerify(userData);
                setPolicyAccepted(userData.policy_accepted);
            })
            .catch((error) => {
                console.error("Error al cargar datos del usuario:", error);
            });
    }, [id]);

    const id_sap = user.id_sap;

    const handleAccept = () => {
        setShowConfirmationModal(true);
    };

    const handleReject = () => {
        setShowRefuseModal(true);
    };

    const handleConfirmation = async (accept) => {
        const values = {
            id_user: id_sap,
            id_policy: 4,
        };

        try {
            if (accept) {
                await axios.post('http://localhost:3001/accept', values);
            } else {
                await axios.post('http://localhost:3001/refuse', values);
            }
            // Recargar la página después de confirmar
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Hubo un error al procesar la solicitud');
        }
        setShowConfirmationModal(false);
        setShowRefuseModal(false);
    };

    return (
        <div className="container mt-4">
            {user.id_sap ? (
                <>
                    <h1>ACEPTACIÓN DE CONSENTIMIENTO INFORMADO ENKADOR</h1>
                    <div className="row mt-4">
                        <div className="col">
                            <p><strong>ID de usuario:</strong> {user.id_sap}</p>
                            <p><strong>Nombre:</strong> {user.name}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>Al dar click en el botón de “Aceptar” Usted acepta que ENKADOR recolecte y almacene
                                sus datos personales, como IP y otros identificadores digitales, con el objetivo de permitir
                                una idónea navegación en esta página web/app, y para que ENKADOR pueda formar
                                bases de datos de clientes con fines comerciales, en función de su Política que se
                                encuentra en el siguiente enlace.</p>
                            <p>Al dar click en el botón de “Aceptar” Usted autoriza a ENKADOR a hacer un tratamiento de
                                datos responsable y en cumplimiento de la Ley Orgánica de Protección de Datos
                                Personales publicada en el Registro Oficial de 26 de mayo de 2021.</p>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col d-flex justify-content-center">
                            {policyAccepted ? (
                                <p>Usted ha aceptado la política de seguridad de la empresa.</p>
                            ) : verify ? (
                                <p>Usted ha rechazado la política de seguridad de la empresa.</p>
                            ) : (
                                <>
                                    <button className="btn btn-primary" onClick={handleAccept}>Aceptar</button>
                                    <button className="btn btn-danger ml-2" onClick={handleReject}>Rechazar</button>
                                </>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div class="container mt-5">
                    <div class="row">
                        <div class="col-md-6 offset-md-3 text-center">
                            <h1 class="display-4">Error 404</h1>
                            <p class="lead">Usuario no encontrado</p>
                            <p>Lo sentimos, pero el usuario que estás buscando no fue encontrado.</p>                            
                        </div>
                    </div>
                </div>
            )}
            {/* Modal de confirmación de aceptación */}
            <div className="modal" style={{ display: showConfirmationModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmación de Aceptación</h5>
                            <button type="button" className="close" onClick={() => setShowConfirmationModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>¿Está seguro de aceptar la política de seguridad de la empresa?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmationModal(false)}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleConfirmation(true)}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de confirmación de rechazo */}
            <div className="modal" style={{ display: showRefuseModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmación de Rechazo</h5>
                            <button type="button" className="close" onClick={() => setShowRefuseModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>¿Está seguro de rechazar la política de seguridad de la empresa?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowRefuseModal(false)}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleConfirmation(false)}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
