import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  constructor(private service:ApiserviceService,private router:ActivatedRoute) { }


errormsg:any;
successmsg:any;
getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
    this.service.getSingleData(this.getparamid).subscribe((res)=>{
         console.log(res,'res==>');
         this.empForm.patchValue({
          name:res.data[0].name,
          city:res.data[0].city,
          salary:res.data[0].salary,
          company:res.data[0].company,
          gender:res.data[0].gender
         });
        
    });
  }
  }

  empForm = new FormGroup({
   'name':new FormControl('', Validators.required),
   'city':new FormControl('',Validators.required),
   'salary':new FormControl('',Validators.required),
   'company':new FormControl('',Validators.required),
   'gender':new FormControl('',Validators.required)

  });



  //new user creation

 empSubmit()
 {
   if(this.empForm.valid)
   {
     console.log(this.empForm.value);
    this.service.createData(this.empForm.value).subscribe((res)=>{
      console.log(res,'res==>');
      this.successmsg = 'yaay!';
      this.empForm.reset();
      
   });
  }else{
    this.errormsg='opps!';
  }
 }
   //update user
   empUpdate(){
    console.log(this.empForm.value,'UpdatedForm');
    if(this.empForm.valid){
     this.service.updateData(this.empForm.value,this.getparamid).subscribe((res)=>{
       console.log(res,'resUpdated');
       //this.empForm.reset();
       this.successmsg = 'yaay!'; 
     });
    }else{
      this.errormsg = 'opps!'
    }
  }

}
