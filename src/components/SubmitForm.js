import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Form , FormGroup , ControlLabel , FormControl , Button , Modal } from 'react-bootstrap';
import '../index.css';

class SubmitForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: "",text: "", tags: [], fcolor: [] , bcolor: [] , showModal: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
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

    handleSubmit(event){
      if(this.state.title!=="" && this.state.text!=="" ){
        var storeList = {title: this.state.title , text: this.state.text, tags: this.state.tags, fcolor: this.state.fcolor , bcolor: this.state.bcolor};
        this.props.add(storeList);
      }
      this.close();
      this.setState({title: "",text: "", tags: [] , fcolor: [] , bcolor: [] });
      event.preventDefault();
    }

    handleOnChange(event){
      const target = event.target;
      if( target.name=== "title"){
        this.setState({title: target.value});
      } else{
        this.setState({text: target.value});
      }
    }
    render() {

        return (
          <div>
            <p className="center"> <Button bsStyle="primary" bsSize="large" onClick={this.open}>New Issue</Button></p>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title> Create New Issue</Modal.Title>
              </Modal.Header>
              <Modal.Body>  
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup  controlId="formInlineName">
                    <ControlLabel>Title</ControlLabel>
                    {' '}
                    <FormControl name="title" type="text" onChange={this.handleOnChange} value={this.state.title} />
                  </FormGroup>
                  {' '}
                  <FormGroup>
                    <ControlLabel>Description </ControlLabel>
                    {' '}
                    <FormControl componentClass="textarea" value={this.state.text} name="description" type="text" onChange={this.handleOnChange} />
                  </FormGroup>
                  {' '}
                  <Button bsStyle="success" type="submit">Submit</Button>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        );
    }
}

export default SubmitForm;