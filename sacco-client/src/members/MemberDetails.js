import { useEffect, useRef, useState } from "react"
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useParams } from "react-router";

export default function MemberDetails() {

    const params = useParams();
    const [member, setMember] = useState();
    const [contributions, setContributions] = useState([]);
    const [contribute, setContribute] = useState(false);
    const [contributeFormData, setContributeFormDate] = useState({
        amount:10000,
        date: new Date()
    });

    let total = 0;

    useEffect(() => {
        fetch(`/members/${params.id}`).then(resp => resp.json())
            .then(setMember);

        fetch(`/members/${params.id}/contributions`).then(resp => resp.json())
            .then(setContributions)

    }, []);

    function handleContributionFormChange(evt){
        setContributeFormDate({
            ...contributeFormData,
            [evt.target.name]: evt.target.value
        });
    }

    function handleContribute(evt){
        evt.preventDefault();
        console.log(contributeFormData)
        fetch(`/contributions`, {
            method:"POST",
            body: JSON.stringify({...contributeFormData, member_id: member.id}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(resp=>{
            if(resp.ok) return resp.json();
            throw new Error(resp.error || resp.statusText)
        })
        .then(newContribution=>{
            setContributions([...contributions, newContribution]);
            setContribute(false);
            setContributeFormDate({
                amount:10000,
                date: new Date()
            });
        })
        .catch(e=>{
            console.e.log(e);
        })
    }

    return <>

        <Modal show={contribute}>
            <Form onSubmit={handleContribute}>
                <Modal.Header>
                    <Modal.Title>Add Contribution</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter Amount"
                            name="amount"
                            value={contributeFormData.amount}
                            onChange={handleContributionFormChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            type="datetime-local" 
                            placeholder="Select Date"
                            name="date"
                            value={contributeFormData.date}
                            onChange={handleContributionFormChange}
                        ></Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={() => setContribute(!contribute)}>Cancel</Button>
                    <Button type="submit" variant="primary">Add Contribution</Button>
                </Modal.Footer>
            </Form>
        </Modal>

        <div className="w-75">
            {member ? <div>
                <h3 className="m-0 h3">Member No. {`${member.id}`.padStart(4, '0')}</h3>
                <div className="d-flex">
                    <div className="p-3 bg-light" style={{ width: '40%' }}>
                        <div className="p-1">
                            Name:<br /><strong>{member.name}</strong>
                        </div>
                        <h4 className="m-0 h4">Contacts</h4>
                        <div className="p-1">
                            Email:<br /><strong>{member.email}</strong>
                        </div>
                        <div className="p-1">
                            Phone:<br /><strong>{member.phone}</strong>
                        </div>
                        <div className="p-1">
                            Address:<br /><strong>{member.physical_address}</strong>
                        </div>
                    </div>

                    <div className="flex-fill p-3">
                        <div className="d-flex justify-content-between w-100">
                            <h4 className="m-0 h4">Contributions</h4>
                            <div className="align-self-center">
                                <Button variant="outline-primary" className="btn-sm" onClick={() => setContribute(!contribute)}>
                                    Add Contribution
                                </Button>
                            </div>
                        </div>

                        <Table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contributions.map(contr=><tr key={contr.id}>
                                    <td>{(new Date(contr.date)).toLocaleString()}</td>
                                    <td>{contr.amount.toFixed(2)}</td>
                                </tr>)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td align="right"><strong>Total Contributions</strong></td>
                                    <td>{contributions.reduce((a, b)=>a+b.amount, 0).toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </Table>
                    </div>
                </div>
            </div> : "Loading..."}
        </div>
    </>
}