$(function () {
    debugger;
    $("#grid").jqGrid({
        url: "/Jqgrid/GetValues",
        datatype: 'json',
        mtype: 'Get',
        //table header name 
        colNames: ['Id', 'Name', 'Phone', 'Address', 'DOB'],
        //colModel takes the data from controller and binds to grid 
        colModel: [
            { key: true, hidden: false, name: 'Id',align:'center',index: 'Id', editable: false,width:50 },
            { key: false, name: 'Name', index: 'Name',align:'center',editable: true,sortable:true },
            { key: false, name: 'Phone', index: 'Phone',align:'center',editable: true,sortable: true },
            { key: false, name: 'Address', index: 'Address',align:'center',editable: true,sortable: true },
            { key: false, name: 'DOB', index: 'DOB', editable: true,align:'center',sortable:true,formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }],
            
        pager: jQuery('#pager'),
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        height: '100%',
        width: 600,
        //loadonce:true,
        sortname: 'Id',
        sortorder:'desc',
        viewrecords: true,
        caption: 'Server side sorting & paging in Jqgrid',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        multiselect: false,
        //loadComplete: function () {
        //    var $this = $(this);
        //    if ($this.jqGrid("getGridParam", "datatype") !== "local") {
        //        setTimeout(function () {
        //            $this.jqGrid("setGridParam", { rowNum: 10 }); // the real value
        //            $this.trigger("reloadGrid");
        //        }, 50);
        //    }
        //},
        //pager-you have to choose here what icons should appear at the bottom
        //like edit,create,delete icons
    }).navGrid('#pager', { edit: true, add: true, del: true, search: false, refresh: true },
        {
            // edit options
            zIndex: 100,
            url: '/Jqgrid/Edit',
            closeOnEscape: true,
            closeAfterEdit: true,
            recreateForm: true,
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        },
        {
            // add options
            zIndex: 100,
            url: "/Jqgrid/Create",
            closeOnEscape: true,
            closeAfterAdd: true,
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        },
        {
            // delete options
            zIndex: 100,
            url: "/Jqgrid/Delete",
            closeOnEscape: true,
            closeAfterDelete: true,
            recreateForm: true,
            msg: "Are you sure you want to delete this task?",
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        });
});