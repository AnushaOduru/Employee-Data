import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import{ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  

  constructor(private service:ApiserviceService,private router:ActivatedRoute) { }

  readData:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
this.getAllDate();


  }
//delete by id
  deleteID(id:any){
    console.log(id,'deleteid==>');
    this.service.deleteDate(id).subscribe((res)=>{
     console.log(res,'deleteres==>');
     this.successmsg = ':)';
     this.getAllDate();
   

    });
  }

  //get data by id
getIdData(id:any){
  console.log(id,'getid==>');
    this.service.getSingleData(id).subscribe((res)=>{
     console.log(res,'getdataid==>');
     this.readData = res.data;
     
    });
}


//getAll data
getAllDate(){
  this.service.getAllData().subscribe((res)=>{
    console.log(res,"res==>");
    this.readData = res.data;
  });
}
}



