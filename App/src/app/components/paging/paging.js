import Paginate from 'vuejs-paginate';

export default {
    props: [
        'totalCount',
        'reloadEntityTable'
    ],
    components: {
        'paginate': Paginate
    },
    data: function () {

        return {
            skipCount: 0,
            totalPage: 0,
            pageSize: 15,
            currentPage: 1
        };
    },
    methods: {

        clickPaging: function (e) {

            this.currentPage = e;

            this.reloadData();
        },
        changePageSize: function (totalCount) {

            this.pageSize = totalCount;
            this.currentPage = 1;
        
            this.reloadData();
        },
        reloadData: function () {

            this.refreshValue();

            if (this.reloadEntityTable)
                this.reloadEntityTable(this.skipCount, this.pageSize);
        },
        refreshValue: function () {
            this.skipCount = (this.currentPage - 1) * this.pageSize;
            this.totalPage = Math.floor((this.totalCount + this.pageSize - 1) / this.pageSize);
        }
    },
    computed: {

        pagingMessage() {

            var from = (this.currentPage - 1) * this.pageSize === 0 ? 1 : (this.currentPage - 1) * this.pageSize;
            var to = (from + this.pageSize) >= this.totalCount ? this.totalCount : from + this.pageSize;

            return "Показаны с " + from + " по " + to + " из " + this.totalCount + " записей";
        }
    },
    watch: {

        totalCount: function () {

            this.refreshValue();
        }
    }
};