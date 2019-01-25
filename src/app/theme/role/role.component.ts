import { Component, OnInit, ViewEncapsulation, AfterViewInit, Renderer } from '@angular/core';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiUrls } from '../../constants';
import { RoleService } from './role.service';
import { Role } from './role';

declare let $: any;
declare let swal: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RoleComponent implements OnInit, AfterViewInit {

  t: any;
  e: any;
  newRoleName: String;
  editRoleName: String;
  roleNewForm: FormGroup;
  roleEditForm: FormGroup;
  submitNew = false;
  submitEdit = false;
  editRoleId: Number;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router
  ) { }

  ngOnInit() {

    this.roleNewForm = this.formBuilder.group({
      newRoleName: ['', Validators.required],
    });
    this.roleEditForm = this.formBuilder.group({
      editRoleId: ['', Validators.required],
      editRoleName: ['', Validators.required],
    });


  }
  ngAfterViewInit() {
    this.RoleDataTable();
  }

  get f() { return this.roleNewForm.controls; }
  get g() { return this.roleEditForm.controls; }

  onSubmitNew() {
    this.submitNew = true;

    // stop here if form is invalid
    if (this.roleNewForm.invalid) {
      return;
    }
    let role: Role = new Role();
    role.name = this.newRoleName;

    this.roleService.addRole(role)
      .subscribe(
        data => {
          $("#m_modal_new").modal("hide");
          $("#addForm").trigger("reset");
          $("#role-data").mDatatable("reload");
          this.submitNew = false;
        },
        errorCode => {
        }
      );
  }

  onSubmitEdit() {
    this.submitEdit = true;
    // stop here if form is invalid
    if (this.roleEditForm.invalid) {
      return;
    }
    let role: Role = new Role();
    role.name = this.editRoleName;
    role.id = this.editRoleId;

    this.roleService.editRole(role)
      .subscribe(
        data => {
          $("#m_modal_edit").modal("hide");
          $("#editForm").trigger("reset");
          $("#role-data").mDatatable("reload");
          this.submitEdit = false;
        },
        errorCode => {
        }
      );
  }

  RoleDataTable() {
    this.t = $("#role-data").mDatatable({
      data: {
        type: "remote",
        source: {
          read: {
            url: "" + ApiUrls.BASE_URL + "roles",
            map: function(t) {
              var e = t;
              return void 0 !== t.data && (e = t.data), e
            }
          }
        },
        pageSize: 10,
        serverPaging: !0,
        serverFiltering: !0,
        serverSorting: !0
      },
      layout: {
        scroll: !1,
        footer: !1
      },
      sortable: !0,
      pagination: !0,
      toolbar: {
        items: {
          pagination: {
            pageSizeSelect: [10, 20, 30, 50, 100]
          }
        }
      },
      search: {
        input: $("#generalSearch")
      },
      columns: [{
        field: "name",
        title: "Role Name",
        filterable: !1,
        template: "{{name}}"
      }, {
        field: "Actions",
        title: "Actions",
        sortable: !1,
        overflow: "visible",
        template: function(t, e, a) {
          //return '\t\t\t\t\t\t<a href="" id="' + t.id + '"  class="edit-button m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\t\t\t\t\t\t\t<i class="la la-edit" ></i>\t\t\t\t\t\t</a>\t\t\t\t\t\t<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\t\t\t\t\t\t\t<i class="la la-trash"></i>\t\t\t\t\t\t</a>\t\t\t\t\t'
          return '\t\t\t\t\t\t<a id="' + t.id + '" name="' + t.name + '" class="privileges-button btn btn-outline-brand btn-sm 	m-btn m-btn--icon" title="Edit Privileges">\t\t\t\t\t\t\t<i class="la la-cogs " ></i>Privileges\t\t\t\t\t\t</a>\t\t\t\t\t\t<a id="' + t.id + '" name="' + t.name + '"  data-toggle="modal" data-target="#m_modal_edit" class="edit-button btn btn-outline-accent btn-sm 	m-btn m-btn--icon" title="Edit details">\t\t\t\t\t\t\t<i class="la la-edit " ></i>Edit\t\t\t\t\t\t</a>\t\t\t\t\t\t<a id="' + t.id + '" class="delete-button btn btn-outline-danger btn-sm 	m-btn m-btn--icon" title="Delete">\t\t\t\t\t\t\t<i class="la la-trash"></i>Delete\t\t\t\t\t\t</a>\t\t\t\t\t'
        }
      }]
    })
    var self = this;
    this.t.on("m-datatable--on-layout-updated", function() {

      $(".privileges-button").on('click', function(e) {
        let id = "";
        if (e.target.id == "") {
          id = e.target.parentNode.id;
        } else {
          id = e.target.id;
        }
        self.editRoleId = +id;


      })

      $(".edit-button").on('click', function(e) {
        let id = "";
        if (e.target.id == "") {
          id = e.target.parentNode.id;
        } else {
          id = e.target.id;
        }
        $("#editFormId").val(id);

        let name = "";
        if (e.target.getAttribute('name') == null) {
          name = e.target.parentNode.getAttribute('name');
        } else {
          name = e.target.getAttribute('name');
        }
        $("#editFormName").val(name);
        self.editRoleName = name;
        self.editRoleId = +id;
      })

      $(".delete-button").on('click', function(e) {
        let id = ""
        if (e.target.id == "") {
          id = e.target.parentNode.id;
        } else {
          id = e.target.id;
        }
        swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: !0,
          confirmButtonText: "Yes, delete it!"
        }).then(function(e) {
          self.roleService.deleteRole(id)
            .subscribe(
              data => {
                e.value && swal("Deleted!", "Your file has been deleted.", "success");
                $("#role-data").mDatatable("reload");
              },
              errorCode => {
                //console.log(errorCode);
              }
            );


        })
      })

    })
  }

}
