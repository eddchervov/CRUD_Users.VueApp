export default {
    props: [
        'user',
        'consts',
        'currentFormOperation',
        'resetAddEditForm'
    ],
    data: function () {
        return {
            countFormError: 0,

            isValidLastName: true,
            errorTextLastName: '',

            isValidFirstName: true,
            errorTextFirstName: '',

            isValidMiddleName: true,
            errorTextMiddleName: '',

            isUserActive: false
        };
    },
    methods: {
        createUser: function () {
            var vue = this;
            if (vue.validationUser()) {
                $.ajax({
                    url: apiUrl + '/api/users/create',
                    contentType: "application/json; charset=utf-8",
                    method: "POST",
                    data: JSON.stringify({
                        LastName: vue.user.lastName,
                        FirstName: vue.user.firstName,
                        MiddleName: vue.user.middleName
                    }),
                    beforeSend: function () {
                        edLoader.start();
                    },
                    success: function (data) {
                        vue.resetAddEditForm();
                        bootbox.alert({
                            message: "Добавлен новый пользователь Id=" + data.userId,
                            backdrop: true,
                            centerVertical: true
                        });
                    },
                    error: function (errorThrown) {
                        console.log(errorThrown);
                        bootbox.alert({
                            message: "Произошла ошибка добавления пользователя",
                            backdrop: true,
                            centerVertical: true
                        });
                    },
                    complete: function () {
                        edLoader.stop();
                    }
                });
            }
        },
        updateUser: function () {

            var vue = this;
            if (vue.validationUser()) {
                $.ajax({
                    url: apiUrl + '/api/users/update',
                    contentType: "application/json; charset=utf-8",
                    method: "POST",
                    data: JSON.stringify({
                        Id: vue.user.id,
                        LastName: vue.user.lastName,
                        FirstName: vue.user.firstName,
                        MiddleName: vue.user.middleName,
                        IsActive: vue.isUserActive
                    }),
                    beforeSend: function () {
                        edLoader.start();
                    },
                    success: function () {
                        vue.resetAddEditForm();
                    },
                    error: function (errorThrown) {
                        console.log(errorThrown);
                        bootbox.alert({
                            message: "Произошла ошибка редактирования пользователя",
                            backdrop: true,
                            centerVertical: true
                        });
                    },
                    complete: function () {
                        edLoader.stop();
                    }
                });
            }
        },
        validationUser: function () {
            this.countFormError = 0;
            if (!this.user.lastName) {
                this.isValidLastName = false;
                this.countFormError += 1;
                this.errorTextLastName = this.fieldIsRequired('Фамилия');
            }
            else
                this.isValidLastName = true;

            if (!this.user.firstName) {
                this.isValidFirstName = false;
                this.countFormError += 1;
                this.errorTextFirstName = this.fieldIsRequired('Имя');
            }
            else
                this.isValidFirstName = true;

            if (this.countFormError === 0)
                return true;
            else
                return false;
        },

        fieldIsRequired: function (unit) {
            return "Поле " + unit + " обязательно для заполнения";
        }
    },
    created: function () {
        this.isUserActive = this.user.isActive;

        this.isValidLastName = true;
        this.errorTextLastName = '';

        this.isValidFirstName = true;
        this.errorTextFirstName = '';

        this.isValidMiddleName = true;
        this.errorTextMiddleName = '';
    }
};