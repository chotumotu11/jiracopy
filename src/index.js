import React from 'react';
import ReactDOM from 'react-dom';
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
          <form onSubmit={this.handleSubmit}>
            <label>
              Title:
            </label>
            <input name="title" type="text" onChange={this.handleOnChange} value={this.state.title} />
            <label>
              Description:
              <textarea value={this.state.text} name="description" type="text" onChange={this.handleOnChange} />
            </label>
            <label>
              Select Tag:
              <select name="tags" onChange={this.handleOnChange}  >
                {this.props.tags.map((x,index) => (<option key={index} value={index}>{x} </option>))}
              </select>
            </label>
            <button bsStyle="primary">Submit</button>
          </form>
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
      <div>{this.props.value.map((li,index) => <p onClick={this.assignDetails} id={index}  key={index}>Title {li.title}   Tags {this.props.tags[li.tags]} </p> )} </div>
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
        <form onSubmit={this.addnewtag}>
          <label>
            <input type="text" name="addtags" onChange={this.handleOnChange} value={this.state.value} />
            <input type="submit" value="Submit" />
          </label>
        </form>
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
      <div>
        <p onClick={() => this.setIsDisplay(true)}>Form </p>
        <p onClick={() => this.setIsDisplay(false)}>Labels </p>
        {myDisplay}
      </div>
    );
  }
}

ReactDOM.render(<MainDisplay />, document.getElementById('root'));