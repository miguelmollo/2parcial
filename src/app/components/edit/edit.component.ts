import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { PostService } from 'src/app/post.service';
//importamos los modulos para formularios
import { FormBuilder, FormGroup } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public editForm: FormGroup;
  postRef:any

  constructor(
    public postService:PostService,
    public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      apellido_p: [''],
      apellido_m: ['']
    })
   }

  ngOnInit(): void {
    //console.log(this.activeRoute.snapshot.params) //desde aqui sacamos el id
    const id = this.activeRoute.snapshot.paramMap.get('id');

    this.postService.getPostById(id).subscribe(res => {
      this.postRef = res;
      this.editForm = this.formBuilder.group({
        name: [this.postRef.name],
        apellido_p: [this.postRef.apellido_p],
        apellido_m: [this.postRef.apellido_m]        
      })            
    })
  }

  onSubmit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');   

    this.postService.updatePost(this.editForm.value, id);
    this.router.navigate(['']);
    //console.log(this.editForm.value) //podemos ver los valores capturados
  }

}
