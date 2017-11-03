import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Nav , Navbar  , NavItem , Form , FormGroup , ControlLabel , FormControl , Button , Grid , Row , Col , Modal , Table } from 'react-bootstrap';
import './index.css';

class SubmitForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: "",text: "", tags: [] , showModal: false};
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
        var storeList = {title: this.state.title , text: this.state.text, tags: this.state.tags};
        this.props.add(storeList);
      }
      this.close();
      this.setState({title: "",text: "", tags: [] });
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


class DisplayListAndForm extends React.Component {

  constructor(props){
    super(props);
    this.assignDetails = this.assignDetails.bind(this);
  }

  assignDetails(e){
    this.props.onDetailsChange(e.target.id);
  }

  render(){
    return (

    <div>
      <SubmitForm add={this.props.add} tags={this.props.tags} />
      <h2>Issue List</h2>
      <ul>
        {this.props.value.map((li,index) => <li key={index} className="blackborder"> <h3 id={index}  onClick={this.assignDetails} >{li.title}</h3> Tags: {li.tags.map((pi,ind) => <span key={ind} className="spanstyle">{pi}</span> )} </li> ) }
      </ul>
    </div>
    );
  }
}

class SearchByTag extends React.Component {

  constructor(props){
    super(props);
    this.state={value: "",showModal: false};
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
    if(add!==""){
      this.props.onSubmit(add);
      this.setState({value: ""});
    }
    this.close();
    e.preventDefault();
  }

  handleOnChange(e){
    this.setState({value: e.target.value});
  }

  handledeletetag(e){
    this.props.deletetag(e.target.id);
  }

  render(){
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
              <Button bsStyle="warning" type="submit">Submit</Button>
            </Form>
          </Modal.Body>
        </Modal>
        <h2> All Tags </h2>
        <Row><ul> {this.props.tags.map((x,index) => (<Col key={index}> <li className="blackborder properpadding"> {x} <a id={index} className="pull-right" onClick={this.handledeletetag}>Remove</a> <span className="clearfix"> </span> </li> </Col>))}</ul> </Row>
      </div>
    );
  }
}

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
    this.props.tagedit(this.state.index,this.state.val);
    this.close();
    event.preventDefault();
  }

  render() {
    const index = this.props.dindex;
    const myobject = this.props.value[index];

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
            <td><ol>{myobject.tags.map((x,index) => (<li key={index}>{x}</li> ) )}</ol> <Button bsStyle="primary" bsSize="small" onClick={this.open}>Edit</Button> </td>
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
                  {this.props.tags.map((x,index) => (<option key={index} value={x}>{x} </option>))}
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


class MainDisplay extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isDisplay: true,
      list: [],
      tags: ["new"],
      details: "",
      number: 1
    };

    this.setIsDisplay = this.setIsDisplay.bind(this);
    this.addToList = this.addToList.bind(this);
    this.addtags = this.addtags.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
    this.tagedit = this.tagedit.bind(this);
    this.deletetag = this.deletetag.bind(this);
  }


  deletetag(tagindex){
    const newtag = this.state.tags.slice();
    const tagtext = newtag[tagindex];
    this.state.list.map((issue,index) => {
       const delindex = issue.tags.indexOf(tagtext);
      if(delindex!==-1){
        issue.tags.splice(delindex,1);
      }
    })
    newtag.splice(tagindex,1);
    this.setState({tags: newtag});
  }

  tagedit(theindex,thenewtag){
    const edittag = this.state.list.slice();
    edittag[theindex].tags.push(thenewtag);
    this.setState({list: edittag});
  }

  addToList(add){
    const addList = this.state.list.slice();
    addList.push(add);
    this.setState({list: addList});
  }


  setIsDisplay(setboolean){
    this.setState({isDisplay: setboolean});
    if(setboolean===true){
      this.setState({number: 1});
    }else{
      this.setState({number: 2});
    }
    this.detailsChange("");
  }

  addtags(add){
    const newtags = this.state.tags.slice();
    newtags.push(add);
    this.setState({tags: newtags});
  }

  detailsChange(detailindex){
    this.setState({details: detailindex});
  }
  render() {
    let myDisplay;
    if(this.state.details===""){
      if(this.state.isDisplay){
        myDisplay = <DisplayListAndForm tags={this.state.tags}  value={this.state.list} add={this.addToList} onDetailsChange={this.detailsChange} />;
      }else{
        myDisplay = <SearchByTag tags={this.state.tags} onSubmit={this.addtags} deletetag={this.deletetag} />;
      }
    }else{
      myDisplay = <DisplayDetails tagedit={this.tagedit} dindex={this.state.details} value={this.state.list} tags={this.state.tags} />;
    }

    return (
      <div>
          <Navbar inverse collapseOnSelect >
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Issue List</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav  activeKey={this.state.number}>
              <NavItem eventKey={1} onClick={() => this.setIsDisplay(true)}>Form </NavItem>
              <NavItem eventKey={2} onClick={() => this.setIsDisplay(false)}>Labels </NavItem>
            </Nav>
          </Navbar>
        <Grid>
          {myDisplay}
        </Grid>
      </div>
    );
  }
}

ReactDOM.render(<MainDisplay />, document.getElementById('root'));