import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Form ,Table , FormGroup , ControlLabel , FormControl , Button , Row , Col , Modal } from 'react-bootstrap';
import '../index.css';

class DisplayDetails extends React.Component{
    constructor(props){
      super(props);
      this.state={
        val: this.props.tags[0],
        index: this.props.dindex
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleOnChange = this.handleOnChange.bind(this);
      this.getInitialState = this.getInitialState.bind(this);
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
      this.handletagdelete = this.handletagdelete.bind(this);
    }
  
    getInitialState() {
      return {showModal: false};
    }
  
    close(){
     this.setState({showModal: false}); 
    }
  
    open(){
      this.setState({showModal: true});
    }
  
    handleOnChange(e){
      this.setState({val: e.target.value, index: e.target.id});
    }
  
    handleSubmit(event){
      if(this.state.val!==undefined){
       this.props.tagedit(this.state.index,this.state.val);
      }
      this.close();
      event.preventDefault();
    }
  
    handletagdelete(e){
      //alert(e.target.id);
      this.props.removetag(this.props.dindex,e.target.id);
    }
  
    render() {
      const index = this.props.dindex;
      const myobject = this.props.value[index];
      const elstyle = [];
      myobject.tags.forEach((x,indi)=>{
        const newstyle = {color: myobject.fcolor[indi],backgroundColor: myobject.bcolor[indi]};
        elstyle.push(newstyle);
      })
  
      const alstyle =[];
      this.props.tags.forEach((x,indi) => {
        const newstyle = {color: this.props.fcolor[indi], backgroundColor: this.props.bcolor[indi]};
        alstyle.push(newstyle);
      })
      return (
      <div> 
        <h1>Issue Details</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {myobject.title} </td>
              <td>{myobject.text} </td>
              <td>{myobject.tags.map((li,ind) => <span style={elstyle[ind]} className="spanstyle" key={ind}>{li}<span className="glyphicon glyphicon-remove" id={ind} onClick={this.handletagdelete} ></span></span>)} <Button bsStyle="primary" bsSize="small" onClick={this.open}>Add</Button> </td>
            </tr>
          </tbody>
          </Table>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title> Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <ControlLabel>Select Tag</ControlLabel>
                  {' '}
                  <FormControl componentClass="select" name="tags" onChange={this.handleOnChange} id={index} value={this.state.val}  >
                    {this.props.tags.map((x,index) => (<option key={index} style={alstyle[index]}  value={x}>{x} </option>))}
                  </FormControl>
                </FormGroup>
                <Button type="submit" bsStyle="warning"  >Submit</Button>
              </Form>
            </Modal.Body>
          </Modal>
      </div>
        ); 
    }
  }
  
  export default DisplayDetails; 