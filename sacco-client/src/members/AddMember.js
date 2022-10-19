import { useState } from "react";
import { Button, Toast, ToastContainer } from "react-bootstrap";

export default function AddMember({ member, onDone }) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        // Incase we have selected a member to edith there details
        ...member
    });

    const [showMessage, setShowMessage] = useState();

    function handleFormData(evt) {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    }

    /**
     * To handle update and add at the same time use the if statement to switch
     * Methods
     *  */ 
    function save(evt) {
        evt.preventDefault();
        /* Include the id in the path if it is an update */
        const {name, email, phone} = formData
        fetch(`/members/${formData.id || ''}`, {
            method: formData.id ? "PATCH" : "POST" , // or better yet use PUT
            body: JSON.stringify({name, email, phone}),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(resp => {
            /* Handle Server side errors */
            if (resp.ok) return resp.json();
            throw new Error(resp.error || resp.statusText);
        })
            .then(newMember => {
                /* Update the list of members with the new member */
                setShowMessage({
                    message: `Member ${newMember.name} addedd successfully`,
                    className: 'bg-success text-light'
                });

                setFormData(newMember);
                onDone(newMember);
            })
            .catch(err => {
                console.log(err);
                setShowMessage({
                    message: err.error || err.message,
                    className: 'bg-danger text-light'
                });
            })
    }

    function toastClose(evt) {
        evt.preventDefault();
        setShowMessage(undefined)
    }

    return <>
        <ToastContainer>
            <Toast show={showMessage != undefined} onClose={toastClose}>
                <Toast.Header className="d-flex justify-content-end">
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    {/* <strong className="me-auto">Bootstrap</strong>
                <small>{showMessage.message}</small> */}
                </Toast.Header>
                <Toast.Body className={showMessage && showMessage.className}>
                    {showMessage && showMessage.message}</Toast.Body>
            </Toast>
        </ToastContainer>

        <form onSubmit={save}>
            <div className="form-group p-2">
                <label>Member Name</label>
                <input type="text" name="name" className="form-control"
                    value={formData.name}
                    onChange={handleFormData}
                />
            </div>
            <div className="form-group p-2">
                <label>Email</label>
                <input type="email" name="email" className="form-control"
                    value={formData.email}
                    onChange={handleFormData}
                />
            </div>
            <div className="form-group p-2">
                <label>Phone Number</label>
                <input type="tel" name="phone" className="form-control"
                    value={formData.phone}
                    onChange={handleFormData}
                />
            </div>
            <div className="form-group p-2 d-flex justify-content-end">
                <Button variant="outline-primary" onClick={onDone} className="me-3" >Cancel</Button>
                <Button type="submit" vairant="primary">Add Member</Button>
            </div>
        </form>
    </>
}