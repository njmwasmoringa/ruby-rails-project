import { useState } from "react"
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddMember from "./AddMember";

export default function Members({ members, onAddMember }) {

    const [addingMember, setAddingMember] = useState(false);
    const [setMember, setSelectedMember] = useState();

    function handleEdit(member) {
        setSelectedMember(member);
        setAddingMember(true);
    }

    function handleModalClose(newMember) { /* newMember is optional */
        setAddingMember(false);
        setSelectedMember(undefined);
        if (newMember) {
            onAddMember(newMember);
        }
    }

    return <div>

        <Modal show={addingMember} onHide={handleModalClose} >
            <Modal.Header>
                <Modal.Title>{setMember ? 'Edit' : 'Add'} Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddMember member={setMember} onDone={handleModalClose} />
            </Modal.Body>
        </Modal>

        <div className="pb-3">
            <Button onClick={() => setAddingMember(!addingMember)} variant="primary">Create Member</Button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th colSpan={2}>Total Contribution</th>
                </tr>
            </thead>
            <tbody>
                {members.map(member => <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.phone}</td>
                    <td>{member.total_contribution}</td>
                    <td>
                        <Button className="btn-sm me-3"
                            variant="light"
                            type="button"
                            onClick={() => handleEdit(member)}>Edit</Button>

                        <Link to={`/details/${member.id}`}>
                            <Button className="btn-sm me-3" variant="light" type="button">View</Button>
                        </Link>
                    </td>
                </tr>)}
            </tbody>
        </Table>
    </div>
}