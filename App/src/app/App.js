import * as CONFIG from './config';
import cu from './components/user-grid/cuOperationUser.vue';
import p from './components/paging/paging.vue';
import viewUserLog from './components/view-user-log/view-user-log.vue';

export default {
    name: 'app',
    components: {
        'cu': cu,
        'ed-paging': p,
        'view-user-log': viewUserLog
    },
    data() {
        return {
            totalCount: 0,
            isEmptyTable: true,
            isUserActive: true,
            consts: CONFIG.consts,
            currentFormOperation: CONFIG.consts.STANDARD_OPERATION,
            selectedUserIndex: -1,
            users: [],
            selectUser: {}
        };
    },
    filters: {
        moment: function (date) {
            return moment(date).format('DD.MM.YYYY');
        }
    },
    methods: {
        transitionOperation(operation) {
            if (operation !== undefined)
                this.currentFormOperation = operation;
        },
        changeIsActiveBtn() {
            this.isUserActive = !this.isUserActive;
            this.resetAddEditForm();
        },
        getUserIndex(index) {
            this.selectedUserIndex = index;
        },
        editUserOpenForm(index) {
            this.selectUser.id = this.users[index].id;
            this.selectUser.lastName = this.users[index].lastName;
            this.selectUser.firstName = this.users[index].firstName;
            this.selectUser.middleName = this.users[index].middleName;
            this.selectUser.isActive = this.users[index].isActive;

            this.transitionOperation(this.consts.EDITING_OPERATION);
        },
        viewUserLogOperation() {
            this.selectUser = this.users[this.selectedUserIndex];
            this.transitionOperation(this.consts.VIEW_USER_LOG_OPERATION);
        },
        cancelViewUserLogOperation() {
            this.transitionOperation(this.consts.STANDARD_OPERATION);
            this.selectUser = {};
        },
        getUsers: function (skip = 0, take = 15) {
            var vue = this;
            $.ajax({
                url: apiUrl + '/api/users/get',
                contentType: "application/json; charset=utf-8",
                method: "POST",
                data: JSON.stringify({
                    isActive: vue.isUserActive,
                    skipCount: skip,
                    takeCount: take
                }),
                beforeSend: function () {
                    edLoader.start();
                },
                success: function (data) {
                    vue.totalCount = data.totalCount;
                    vue.users = data.users;
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    bootbox.alert({
                        message: "Произошла ошибка получения списка пользователей",
                        backdrop: true,
                        centerVertical: true
                    });
                },
                complete: function () {
                    edLoader.stop();
                }
            });
        },

        resetAddEditForm() {
            this.getUsers();
            this.transitionOperation(this.consts.STANDARD_OPERATION);
            this.selectUser = {};
        },
        // custom pagination method
        reloadEntityTable: function (skip, take) {

            this.selectedUserIndex = -1;
            this.getUsers(skip, take);
        }
    },
    watch: {
        users: function () {
            if (this.users.length > 0)
                this.isEmptyTable = false;
            else
                this.isEmptyTable = true;
        }
    },
    created: function () {
        //this.endLoadingForm();
        this.getUsers();
    }
};