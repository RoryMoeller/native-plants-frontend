var plantType = null;
var ids = [];
var isClick = false;


function getTableData(data1, data2) {
  var tableArrData = [];
  var tObj = null;

  for (var i = 0; i < 9; i++) {
    let checked = false;
    tObj = {
      // id: val[i].ID,
      name: data1[i],
      startTime: data2[i],
    };
    tableArrData.push(tObj);

  }

  layui.use("table", function () {
    tableInit(tableArrData);
  });

}



$("#login_btn_panel1").on("click", function () {
  insertPoint();
});



$("#expand").on("click", function () {
  $("#expand").hide();
  $(".imgFold").show(300);
  $(".listBox").show(300);
  isClick = true;

});
$("#fold").on("click", async function () {
  $(".imgFold").hide(300);
  $(".listBox").hide(300);
  $("#expand").show();
  isClick = false;

  Global.showingTyphoon = false;
});
$("#expand").hover(
  function () {
    $(this).addClass("animated tada");
  },
  function () {
    $(this).removeClass("animated tada");
  }
);
$("#fold").hover(
  function () {
    $(this).addClass("animated tada");
  },
  function () {
    $(this).removeClass("animated tada");
  }
);
