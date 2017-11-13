import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import SubmitForm from './SubmitForm';
import '../index.css';

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
    
    export default DisplayListAndForm;