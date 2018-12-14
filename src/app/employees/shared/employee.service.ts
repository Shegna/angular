import { Injectable } from '@angular/core';
import {Employee} from './employee.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

//import { catchError , map} from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable()
  //{
  //providedIn: 'root'
//)
export class EmployeeService {



  selectedEmployee : Employee;


  employeeList:Employee[];

  constructor(private http : Http) { }
  postEmployee(emp : Employee)
{

var body=JSON.stringify(emp)
var headerOptions = new Headers({'Content-Type':'application/json'});
var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
return this.http.post('http://localhost:5555/employees',body,requestOptions).pipe(map(x => x.json()));
}

putEmployee(id,emp){
  var body = JSON.stringify(emp);
  var headerOptions = new Headers({'content-Type':'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headerOptions});
  return this.http.put('http://localhost:5555/employees/'+id,body,requestOptions).pipe(map(x => x.json()));
}


getEmployeeList(){
  this.http.get('http://localhost:5555/employees')
.pipe(map((data:Response)=>{
return data.json() as Employee[];

})).toPromise().then(x=>{
  this.employeeList=x;
})

}

deleteEmployee(id:number){ 
  return this.http.delete('http://localhost:5555/employees/'+id).pipe(map(x => x.json()));
  }

}



