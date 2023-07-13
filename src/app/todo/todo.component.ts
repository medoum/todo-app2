import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Itask } from '../models/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
  todoFrom!: FormGroup;
  tasks: Itask[] = [];
  inprogress: Itask[] = [];
  done: Itask[] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder, ){}

  ngOnInit(): void {
    this.todoFrom = this.fb.group({
      item: ['', Validators.required],

    })
  }
  addTask(){
    this.tasks.push({
      description: this.todoFrom.value.item,
      done: false

    });
    this.todoFrom.reset();  
  }
  onEdit(item:Itask, i: number){
    this.todoFrom.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }
  updateTask(){
    this.tasks[this.updateIndex].description = this.todoFrom.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoFrom.reset();
    this.updateIndex =undefined;
    this.isEditEnabled = false;
  }
  deleteTask(i: number){
    this.tasks.splice(i,1);
  }
  deleteTaskInProgress(i: number){
    this.inprogress.splice(i,1);
  }
  deleteTaskDone(i: number){
    this.inprogress.splice(i,1);
  }
  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
