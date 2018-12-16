angular.module('inventory')
    .controller('inventoryController', inventoryController);
inventoryController.$inject = ["$state", "$rootScope", "toastr", "InventoryResolve", "$window"]

function inventoryController($state, $rootScope, toastr, InventoryResolve, $window) {
    var ic = this;
    var data = [];
    var inventory = $window.localStorage.getItem('inventory');
    if (inventory == null) {
        data = []
    } else {
        data = JSON.parse($window.localStorage.getItem('inventory'))
    }
    if (data.length > 0) {
        ic.baseInfo = data
    } else {
        ic.baseInfo = []
    }
    ic.add = false;
    ic.view = true;
    ic.saveBtn = true;

    function baseinfo(valid, form) {
        if (valid) {
            var data = form;
            var unique = Math.random().toString(36).substring(7);
            form.unique = unique;
            ic.baseInfo.push(form)
            var info = JSON.parse(angular.toJson(ic.baseInfo));
            $window.localStorage.setItem('inventory', JSON.stringify(info));
            toastr.success('Successfully added');
            ic.add = false;
            ic.view = true;
            ic.baseinfoform = {}
        } else {
            toastr.info('Kindly fill all fields');
        }
    }

    function Editbase(valid, form) {
        var data = JSON.parse($window.localStorage.getItem('inventory'))
        function indexVal(index) {
            return index.unique === form.unique
        }

        var index = data.findIndex(indexVal);
        data[index] = form;
        $window.localStorage.setItem('inventory', JSON.stringify(data));
        viewBaseInfo()
        toastr.success('Successfully Updated');
    }

    function addBaseInfo() {
        ic.baseinfoform = {}
        ic.add = true;
        ic.view = false;
        ic.editBtn = false;
        ic.saveBtn = true;
    }

    function viewBaseInfo() {
        ic.baseInfo = JSON.parse($window.localStorage.getItem('inventory'))
        ic.add = false;
        ic.view = true;
    }

    function editBaseInfo(unique) {
        var data = JSON.parse($window.localStorage.getItem('inventory'));
        function filter(value) {
            return value.unique === unique
        }

        var editBase = data.filter(filter)

        ic.baseinfoform = editBase[0]
        ic.add = true;
        ic.view = false;

        ic.editBtn = true;
        ic.saveBtn = false;
    }

    function cancelBase() {
        ic.view = true;
        ic.add = false;
    }

    function deleteBaseInfo(unique) {
        var data = JSON.parse($window.localStorage.getItem('inventory'))
        var x = confirm("Are you sure you want to delete?");
        if (x) {
            function indexVal(index) {
                return index.unique === unique
            }
            var index = data.indexOf(unique);
            data.splice(index, 1);
            $window.localStorage.setItem('inventory', JSON.stringify(data));
            toastr.success('Successfully Deleted');
            ic.baseInfo = JSON.parse($window.localStorage.getItem('inventory'))
        }
    }

    angular.extend(ic, {
        baseinfo: baseinfo,
        addBaseInfo: addBaseInfo,
        editBaseInfo: editBaseInfo,
        viewBaseInfo: viewBaseInfo,
        Editbase: Editbase,
        cancelBase: cancelBase,
        deleteBaseInfo: deleteBaseInfo
    })
}


