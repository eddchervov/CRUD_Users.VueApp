export default {
    props: [
        'userId',
        'cancelViewUserLogOperation'
    ],
    data: function () {
        return {
            userLogs: []
        };
    },
    filters: {
        moment: function (date) {
            return moment(date).format('DD.MM.YYYY HH:mm');
        }
    },
    methods: {
        getUserLogs: function () {
            var vue = this;
            $.ajax({
                url: apiUrl + '/api/user-logs/get-by-user-id',
                contentType: "application/json; charset=utf-8",
                method: "POST",
                data: JSON.stringify({
                    UserId: vue.userId
                }),
                beforeSend: function () {
                    edLoader.start();
                },
                success: function (data) {
                    vue.userLogs = data.userLogModels;
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                    bootbox.alert({
                        message: "Произошла ошибка получения списка историй изменений",
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
    created() {
        this.getUserLogs();
    }
};