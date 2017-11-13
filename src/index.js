import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Nav , Navbar  , NavItem , Form , FormGroup , ControlLabel , FormControl , Button , Grid , Row , Col , Modal , Table } from 'react-bootstrap';
import './index.css';

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


class DisplayListAndForm extends React.Component {

  constructor(props){
    super(props);
    this.assignDetails = this.assignDetails.bind(this);
  }

  assignDetails(e){
    this.props.onDetailsChange(e.target.id);
  }

  render(){
    const valstyle = [];
    this.props.value.forEach((myobject,indi1)=>{
      const elstyle = [];
      myobject.tags.forEach((x,indi2)=>{
        const newstyle = {color: myobject.fcolor[indi2],backgroundColor: myobject.bcolor[indi2]};
        elstyle.push(newstyle);
      })
      valstyle.push(elstyle);
    });
    return (

    <div>
      <SubmitForm add={this.props.add} tags={this.props.tags} />
      <h2>Issue List</h2><small>(Click on Title to view details.)</small>
      <ul>
        {this.props.value.map((li,index) => <li key={index} className="blackborder"> <h3 id={index}  onClick={this.assignDetails} >{li.title}</h3> Tags: {li.tags.map((pi,ind) => <span style={valstyle[index][ind]} key={ind} className="spans">{pi}</span> )} </li> ) }
      </ul>
    </div>
    );
  }
}

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
                  {this.props.tags.map((x,index) => (<option key={index} style={alstyle}  value={x}>{x} </option>))}
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
      fcolor: ["white"],
      bcolor: ["red"],
      details: "",
      number: 1
    };

    this.setIsDisplay = this.setIsDisplay.bind(this);
    this.addToList = this.addToList.bind(this);
    this.addtags = this.addtags.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
    this.tagedit = this.tagedit.bind(this);
    this.deletetag = this.deletetag.bind(this);
    this.displayremovetag = this.displayremovetag.bind(this);
  }


  displayremovetag(theindex,thetagindex){
    const listedit = this.state.list.slice();
    listedit[theindex].tags.splice(thetagindex,1);
    listedit[theindex].fcolor.splice(thetagindex,1);
    listedit[theindex].bcolor.splice(thetagindex,1);
    this.setState({list: listedit});
  }

  deletetag(tagindex){
    const newtag = this.state.tags.slice();
    const fcolor1 = this.state.fcolor.slice();
    const bcolor1 = this.state.bcolor.slice();
    const tagtext = newtag[tagindex];
    const dellist = this.state.list;
    dellist.forEach((issue,index) => {
       const delindex = issue.tags.indexOf(tagtext);
      if(delindex!==-1){
        issue.tags.splice(delindex,1);
        issue.fcolor.splice(delindex,1);
        issue.bcolor.splice(delindex,1);
      }
    })
    fcolor1.splice(tagindex,1);
    bcolor1.splice(tagindex,1);
    newtag.splice(tagindex,1);
    this.setState({list: dellist,tags: newtag,fcolor: fcolor1,bcolor: bcolor1});
  }

  tagedit(theindex,thenewtag){
    const edittag = this.state.list.slice();
    const tagindex = this.state.tags.indexOf(thenewtag);
    if(edittag[theindex].tags.indexOf(thenewtag)===-1){
      edittag[theindex].tags.push(thenewtag);
      edittag[theindex].fcolor.push(this.state.fcolor[tagindex]);
      edittag[theindex].bcolor.push(this.state.bcolor[tagindex]);
      this.setState({list: edittag});
    }
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

  addtags(add,fcolor,bcolor){
    const newtags = this.state.tags.slice();
    const fc = this.state.fcolor.slice();
    const bc = this.state.bcolor.slice();
    // Convert the array to lowercase.
    const newtags1 = newtags.map((x,index) => {return x.toLowerCase()} );
    const answer = newtags1.indexOf(add.toLowerCase());
    if(answer===-1){
      newtags.push(add);
      fc.push(fcolor);
      bc.push(bcolor);
      this.setState({tags: newtags,fcolor: fc,bcolor: bc});
    }
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
        myDisplay = <SearchByTag tags={this.state.tags} fcolor={this.state.fcolor} bcolor={this.state.bcolor} onSubmit={this.addtags} deletetag={this.deletetag} />;
      }
    }else{
      myDisplay = <DisplayDetails tagedit={this.tagedit} dindex={this.state.details} value={this.state.list} tags={this.state.tags} removetag={this.displayremovetag}/>;
    }

    return (
      <div>
          <Navbar inverse collapseOnSelect >
            <Navbar.Header>
              <Navbar.Brand>
                <a>Issue List</a>
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