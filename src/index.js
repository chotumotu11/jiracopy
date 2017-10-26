import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class SubmitForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: "",text: "", tags: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleSubmit(event){
      if(this.state.title!="" && this.state.text!="" ){
        if(this.state.tags==""){
          this.state.tags= "NEW";
        }
        var storeList = {title: this.state.title , text: this.state.text , tags: this.state.tags};
        this.props.add(storeList);
      }
      this.setState({title: "",text: "", tags: ""});
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
              <input name="title" type="text" onChange={this.handleOnChange} value={this.state.title} />
            </label>
            <label>
              Description:
              <textarea value={this.state.text} name="description" type="text" onChange={this.handleOnChange} />
            </label>
            <label>
              Tag:
              <input name="tags" type="text" onChange={this.handleOnChange} value={this.state.tags} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }
}


class DisplayListAndForm extends React.Component {

  render(){
    return (
    <div>
      <SubmitForm add={this.props.add} />
      <h2>ALL Issues</h2>
      <div>{this.props.value.map((li,index) => <p key={index}>Title {li.title}  Description {li.text}  Tags {li.tags} </p> )} </div>
    </div>
    );
  }
}

class SearchByTag extends React.Component {
  render(){
    return (
      <h1> Search </h1>
    );
  }
}


class MainDisplay extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isDisplay: true,
      list: []
    };

    this.setIsDisplay = this.setIsDisplay.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  addToList(add){
    const addList = this.state.list.slice();
    addList.push(add);
    this.setState({list: addList});
  }


  setIsDisplay(setboolean){
    this.setState({isDisplay: setboolean});
  }

  render() {
    let myDisplay;
    if(this.state.isDisplay){
      myDisplay = <DisplayListAndForm  value={this.state.list} add={this.addToList} />;
    }else{
      myDisplay = <SearchByTag />;
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