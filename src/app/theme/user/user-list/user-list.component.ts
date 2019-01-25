import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { ApiUrls } from '../../../constants';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
declare let $: any;
declare let swal: any;

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit, AfterViewInit {

  t: any;
  e: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) {

  }
  ngOnInit() {
    this.UserDataTable();
  }
  ngAfterViewInit() { }

  UserDataTable() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.t = $("#user-data").mDatatable({
      data: {
        type: "remote",
        source: {
          read: {
            url: "" + ApiUrls.BASE_URL + "users",
            headers:{ Authorization : `Bearer ${currentUser.token}`,},
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
      columns: [
        {
          field: "firstName",
          title: "First Name",
          filterable: !1,
        },
        {
          field: "lastName",
          title: "Last Name",
          filterable: !1,
        },
        {
          field: "email",
          title: "E-mail",
          filterable: !1,
        },
        {
          field: "role.name",
          title: "Role",
          filterable: !1,
        },
        {
          field: "createdBy",
          title: "Cretaed By",
          filterable: !1,
        },
        {
          field: "status",
          title: "Status",
          filterable: !1,
          template: function(e) {
            var a = {
              "PENDING": {
                title: "Pending",
                class: "m-badge--brand"
              },
              "INACTIVE": {
                title: "Inactive",
                class: " m-badge--metal"
              },
              "DELETED": {
                title: "deleted",
                class: " m-badge--danger"
              },
              "ACTIVE": {
                title: "Active",
                class: " m-badge--success"
              }
            };
            return '<span class="m-badge ' + a[e.status].class + ' m-badge--wide">' + a[e.status].title + "</span>"
          }
        },
        {
          field: "Actions",
          title: "Actions",
          sortable: !1,
          overflow: "visible",
          template: function(t, e, a) {
            return '\t\t\t\t\t\t<a id="' + t.id + '" class="edit-button btn btn-outline-accent btn-sm 	m-btn m-btn--icon" title="Edit details">\t\t\t\t\t\t\t<i class="la la-edit " ></i>Edit\t\t\t\t\t\t</a>\t\t\t\t\t\t<a id="' + t.id + '" class="delete-button btn btn-outline-danger btn-sm 	m-btn m-btn--icon" title="Delete">\t\t\t\t\t\t\t<i class="la la-trash"></i>Delete\t\t\t\t\t\t</a>\t\t\t\t\t'
          }
        }
      ]
    })
    var self = this;
    this.t.on("m-datatable--on-layout-updated", function() {
      $(".edit-button").on('click', function(e) {
        let id = ""
        if (e.target.id == "") {
          id = e.target.parentNode.id;
          self.router.navigate(['', 'user', 'edit', id]);
        } else {
          id = e.target.id;
          self.router.navigate(['', 'user', 'edit', id]);
        }

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
          self.userService.deleteUser(id)
            .subscribe(
              data => {
                e.value && swal("Deleted!", "Your file has been deleted.", "success");
                $("#user-data").mDatatable("reload");
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
