import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../../Task';


@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
	tasks:Task[];
	title: string;

    constructor(private taskService:TaskService){
       this.taskService.getTasks().subscribe(tasks => 
       {
       this.tasks=tasks;

       } ); 
           
    }//eof contructor
    
    addTask(event){
    	event.preventDefault();
    	var newTask=  {
    	title:this.title,
    	isDone:false
    	}

    	this.taskService.addTask(newTask).subscribe(task => {
    	this.tasks.push(task);
    	this.title='';
    	});

    }//eod addTask

    deleteTask(id){
    var tasks=this.tasks;
    this.taskService.deleteTask(id).subscribe(data => {

    if (data.n==1){ 
    	for(var i=0; i <tasks.length; i++){
    		if(tasks[i]._id==id){
    				tasks.splice(i, 1);

    			}//eof if
    		}//eof for
    	 }//end of if
    })//end of this tasks

    }//eof deleteTask

    updateStatus(task){

    	var _task={
    	_id:task._id,
    	title:task.title,
    	isDone:!task.isDone	
    	};// eof _task
    
	    this.taskService.updateStatus(  _task).subscribe( data => {task.isDone=!task.isDone} )

    }//updateStatuse end

}//eof class taskComponent