import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Form , FormGroup , ControlLabel , FormControl , Button , Row , Col , Modal } from 'react-bootstrap';
import '../index.css';

class SearchByTag extends React.Component {
    
      constructor(props){
        super(props);
        this.state={value: "",fcolor: "white",bcolor: "#388E3C",showModal: false};
        this.addnewtag = this.addnewtag.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handledeletetag = this.handledeletetag.bind(this);
      }
    
      getInitialState() {
        return { showModal: false };
      }
    
      close() {
        this.setState({ showModal: false });
      }
    
      open() {
        this.setState({ showModal: true });
      }
    
      addnewtag(e){
        const add = this.state.value;
        const fcolor = this.state.fcolor;
        const bcolor = this.state.bcolor;
        if(add!==""){
          this.props.onSubmit(add,fcolor,bcolor);
          this.setState({value: "",fcolor: "white",bcolor: "#388E3C"});
        }
        this.close();
        e.preventDefault();
      }
    
      handleOnChange(e){
        if(e.target.name==="addtags"){
          this.setState({value: e.target.value});
        }else if(e.target.name==="fcolor"){
          this.setState({fcolor: e.target.value});
        }else{
          this.setState({bcolor: e.target.value});
        }
      }
    
      handledeletetag(e){
        this.props.deletetag(e.target.id);
      }
    
      render(){
        const elstyle = [];
        this.props.tags.forEach((x,indi) => {
          const newel = {color: this.props.fcolor[indi],backgroundColor: this.props.bcolor[indi]};
          elstyle.push(newel);
        })    
        return (
          <div>
            <p className="center"> <Button bsStyle="primary" bsSize="large" onClick={this.open}>New Tag</Button></p>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title> New Tag</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.addnewtag} >
                  <FormGroup>
                    <ControlLabel>Name</ControlLabel>
                    {' '}
                    <FormControl type="text" name="addtags" onChange={this.handleOnChange} value={this.state.value} />
                  </FormGroup>
                  {' '}
                  <FormGroup>
                    <ControlLabel>
                      Font Color:
                    </ControlLabel>
                    {' '}
                    <FormControl type="text" name="fcolor" value={this.state.fcolor} onChange={this.handleOnChange} />
                  </FormGroup>
                  {' '}
                  <FormGroup>
                    <ControlLabel>Background Color: </ControlLabel>
                    {' '}
                    <FormControl type="text" name="bcolor" value={this.state.bcolor} onChange={this.handleOnChange}/>
                  </FormGroup>
                  <Button bsStyle="warning" type="submit">Submit</Button>
                </Form>
              </Modal.Body>
            </Modal>
            <h2> All Tags </h2>
            <Row><ul> {this.props.tags.map((x,index) => ( <Col key={index}>  <li className="blackborder properpadding"> <span className="spanstyle" style={elstyle[index]} >{x}</span> <a id={index} className="pull-right" onClick={this.handledeletetag}>Remove</a> <span className="clearfix"> </span> </li> </Col>))}</ul> </Row>
          </div>
        );
      }
    }

    export default SearchByTag;