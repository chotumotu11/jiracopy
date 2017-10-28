import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Nav , Navbar  , NavItem , Form , FormGroup , ControlLabel , FormControl , Button , Grid , Row , Col } from 'react-bootstrap';
import './index.css';

class SubmitForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: "",text: "", tags: 0};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }


    handleSubmit(event){
      if(this.state.title!="" && this.state.text!="" ){
        var storeList = {title: this.state.title , text: this.state.text , tags: this.state.tags};
        this.props.add(storeList);
      }
      this.setState({title: "",text: "", tags: 0});
      event.preventDefault();
    }

    handleOnChange(event){
      const target = event.target;
      if( target.name=== "title"){
        this.setState({title: target.value});
      } else if (target.name==="description"){
        this.setState({text: target.value});
      } else {
        this.setState({tags: target.value});
      }
    }
    render() {
        return (
          <Form onSubmit={this.handleSubmit} inline>
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
            <FormGroup>
              <ControlLabel>Select Tag</ControlLabel>
              {' '}
              <FormControl componentClass="select" name="tags" onChange={this.handleOnChange}  >
                {this.props.tags.map((x,index) => (<option key={index} value={index}>{x} </option>))}
              </FormControl>
            </FormGroup>
            <p>
              <Button bsStyle="success" type="submit">Submit</Button>
            </p>
          </Form>
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
      <h2>ALL Issues</h2>
      <Row>{this.props.value.map((li,index) => <Col  xs={6} sm={3} key={index}> <div className="design"> <p className="paradesign"> Title {li.title} </p> <p className="para2design"> Tags {this.props.tags[li.tags]} <p className="para3"><Button id={index} bsStyle="primary" onClick={this.assignDetails} >View</Button> </p> </p> </div> </Col>) } </Row>
    </div>
    );
  }
}

class SearchByTag extends React.Component {

  constructor(props){
    super(props);
    this.state={value: ""};
    this.addnewtag = this.addnewtag.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  addnewtag(e){
    const add = this.state.value;
    this.props.onSubmit(add);
    e.preventDefault();
  }

  handleOnChange(e){
    this.setState({value: e.target.value});
  }

  render(){
    return (
      <div>
        <h2>Add new tag</h2>
        <Form onSubmit={this.addnewtag} inline>
          <FormGroup>
            <ControlLabel>New Tag</ControlLabel>
            {' '}
            <FormControl type="text" name="addtags" onChange={this.handleOnChange} value={this.state.value} />
          </FormGroup>
          {' '}
          <Button bsStyle="warning" type="submit">Submit</Button>
        </Form>
        <h2> All Tags </h2>
        {this.props.tags.map((x,index) => (<li key={index}> {x} </li>))}
      </div>
    );
  }
}

class DisplayDetails extends React.Component{
  render() {
    const index = this.props.dindex;
    const myobject = this.props.value[index];

    return (
    <div>
      <h2> Issue Details </h2>
      <h3>Title</h3>
      <p>{myobject.title}</p>
      <h3>Description</h3>
      <p>{myobject.text} </p>
      <h3>Tags </h3>
      <p>{this.props.tags[myobject.tags]} </p>
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
      details: ""
    };

    this.setIsDisplay = this.setIsDisplay.bind(this);
    this.addToList = this.addToList.bind(this);
    this.addtags = this.addtags.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
  }

  addToList(add){
    const addList = this.state.list.slice();
    addList.push(add);
    this.setState({list: addList});
  }


  setIsDisplay(setboolean){
    this.setState({isDisplay: setboolean});
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
    if(this.state.details==""){
      if(this.state.isDisplay){
        myDisplay = <DisplayListAndForm tags={this.state.tags}  value={this.state.list} add={this.addToList} onDetailsChange={this.detailsChange} />;
      }else{
        myDisplay = <SearchByTag tags={this.state.tags} onSubmit={this.addtags} />;
      }
    }else{
      myDisplay = <DisplayDetails dindex={this.state.details} value={this.state.list} tags={this.state.tags} />;
    }

    return (
      <Grid>
        <Navbar inverse collapseOnSelect >
          <Nav bsStyle="pills" activeKey={1}>
            <NavItem eventKey={1} onClick={() => this.setIsDisplay(true)}>Form </NavItem>
            <NavItem eventKey={2} onClick={() => this.setIsDisplay(false)}>Labels </NavItem>
          </Nav>
        </Navbar>
        {myDisplay}
      </Grid>
    );
  }
}

ReactDOM.render(<MainDisplay />, document.getElementById('root'));