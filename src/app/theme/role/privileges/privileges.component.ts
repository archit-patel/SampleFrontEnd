import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Role } from '../role';
import { UserService } from '../../user/user.service';
import { RoleService } from '../role.service';
import { Privilege } from '../privilege';
declare let $: any;

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PrivilegesComponent implements OnInit {

  roleList: Role[];
  privilegeList: Privilege[];
  role: Role;
  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.getAllRoles();
    this.getAllPrivileges();
  }

  getAllRoles() {
    this.userService.getAllRoles()
      .subscribe(
        data => {
          this.roleList = data['data'];
        },
        errorCode => {
          console.log("Here In Errpr Code " + errorCode)
        }
      );
  }

  getPrivilage() {
    for (let entry of this.privilegeList) {
      $("#" + entry.name).prop('checked', false);
    }

    this.roleService.getRoleById(this.role.id)
      .subscribe(
        data => {
          let rolePrivilegesList: Privilege[] = data['data']['privileges'];
          //this.privilegeList = data['data'];
          for (let entry of rolePrivilegesList) {
            $("#" + entry.name).prop('checked', true);
          }
        },
        errorCode => {
          console.log("Here In Errpr Code " + errorCode)
        }
      );
  }

  getAllPrivileges() {
    this.roleService.getAllPrivileges()
      .subscribe(
        data => {
          console.log(data);
          this.privilegeList = data['data'];
        },
        errorCode => {
          console.log("Here In Errpr Code " + errorCode)
        }
      );
  }

  addPermissionToRole(v, id) {
    try {
      let body = new FormData();
      body.append("privilegeId", id);
      body.append("roleId", "" + this.role.id);

      if (v) {
        this.roleService.addPrivilegeToRole(body).subscribe(
          data => {
            console.log(data);
          },
          errorCode => {
            console.log("Here In Errpr Code " + errorCode)
          }
        );
      } else {
        this.roleService.removePrivilegeFromRole(body).subscribe(
          data => {
            console.log(data);
          },
          errorCode => {
            console.log("Here In Errpr Code " + errorCode)
          }
        );
      }
    } catch (err) {
      console.log(err)
    }

  }

}
