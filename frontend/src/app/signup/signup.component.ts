import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { TeacherService } from '../services/teacher.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: any= FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private teacherService:TeacherService,
    private snackbarService: SnackbarService,
    private dialogReference: MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
    this.signupForm= this.formBuilder.group({
      tname:[null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      emailId:[null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      passkey:[null, [Validators.required]]
    })
  }

  handleSubmit(){
    var formData = this.signupForm.value;
    var data={
      tname: formData.tname,
      emailId: formData.emailId,
      passkey: formData.passkey
    }
    // console.log("I'm in handleSubmit")
    // console.log(data)
    this.teacherService.signup(data).subscribe((response:any)=>{
      this.dialogReference.close();
      this.responseMessage= response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"");
      // this.router.navigate(['/']);
    }, (error) =>{
      if(error.error?.message){
        this.responseMessage =error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
    })
  }
}
