import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Nav , Navbar  , NavItem , Form , FormGroup , ControlLabel , FormControl , Button , Grid , Modal , Table } from 'react-bootstrap';
import './index.css';
import DisplayListAndForm from './components/DisplayListAndForm';
import DisplayDetails from './components/DisplayDetails';
import SearchByTag from './components/SearchByTag';


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
          myDisplay = <DisplayDetails tagedit={this.tagedit} dindex={this.state.details} value={this.state.list} tags={this.state.tags} fcolor={this.state.fcolor} bcolor={this.state.bcolor} removetag={this.displayremovetag}/>;
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