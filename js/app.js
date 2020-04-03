function drawGameTable(data) {
    $("#game").append(
        $("<thead></thead>").append(
            $("<tr></tr>")
            .append($("<th></th>").text("試合ID"))
            .append($("<th></th>").text("ゲーム開始時の日付"))
            .append($("<th></th>").text("相手のチーム名"))
            .append($("<th></th>").text("マップ"))
            .append($("<th></th>").text("先攻"))
            .append($("<th></th>").text("自チーム攻撃側オペレーターBAN"))
            .append($("<th></th>").text("相手チーム攻撃側オペレーターBAN"))
            .append($("<th></th>").text("自チーム防衛側オペレーターBAN"))
            .append($("<th></th>").text("相手チーム防衛側オペレーターBAN"))
            .append($("<th></th>").text("試合結果"))
            .append($("<th></th>").text("自チームスコア"))
            .append($("<th></th>").text("相手チームスコア"))
        )
    );
    var tbody = $("<tbody></tbody>");
    for (var i = 0; i < data["game"]["game_id"].length; i++) {
        tbody.append(
            $("<tr></tr>")
            .append($("<th></th>").text(String(data["game"]["game_id"][i])))
            .append($("<th></th>").text(String(data["game"]["date"][i])))
            .append($("<th></th>").text(String(data["game"]["opponent"][i])))
            .append($("<th></th>").text(String(data["game"]["map"][i])))
            .append($("<th></th>").text(String(data["game"]["offense_first"][i])))
            .append($("<th></th>").text(String(data["game"]["offense_ban_own"][i])))
            .append($("<th></th>").text(String(data["game"]["offense_ban_opponent"][i])))
            .append($("<th></th>").text(String(data["game"]["defense_ban_own"][i])))
            .append($("<th></th>").text(String(data["game"]["defense_ban_opponent"][i])))
            .append($("<th></th>").text(String(data["game"]["result"][i])))
            .append($("<th></th>").text(String(data["game"]["score_own"][i])))
            .append($("<th></th>").text(String(data["game"]["score_opponent"][i])))
        );
    }
    $("#game").append(tbody);
    $("#game").DataTable();
}

function drawRoundTable(data) {
    $("#round").append(
        $("<thead></thead>").append(
            $("<tr></tr>")
            .append($("<th></th>").text("試合ID"))
            .append($("<th></th>").text("ラウンド数"))
            .append($("<th></th>").text("攻防"))
            .append($("<th></th>").text("防衛地点"))
            .append($("<th></th>").text("勝敗"))
        )
    );
    var tbody = $("<tbody></tbody>");
    for (var i = 0; i < data["round"]["game_id"].length; i++) {
        tbody.append(
            $("<tr></tr>")
            .append($("<th></th>").text(String(data["game"]["game_id"][i])))
            .append($("<th></th>").text(String(data["game"]["num"][i])))
            .append($("<th></th>").text(String(data["game"]["od"][i])))
            .append($("<th></th>").text(String(data["game"]["point"][i])))
            .append($("<th></th>").text(String(data["game"]["wl"][i])))
        );
    }
    $("#round").append(tbody);
    $("#round").DataTable();
}

function drawScoreTable(data) {
    $("#score").append(
        $("<thead></thead>").append(
            $("<tr></tr>")
            .append($("<th></th>").text("試合ID"))
            .append($("<th></th>").text("チーム名"))
            .append($("<th></th>").text("UplayID"))
            .append($("<th></th>").text("スコア"))
            .append($("<th></th>").text("キル"))
            .append($("<th></th>").text("アシスト"))
            .append($("<th></th>").text("デス"))
        )
    );
    var tbody = $("<tbody></tbody>");
    for (var i = 0; i < data["score"]["game_id"].length; i++) {
        tbody.append(
            $("<tr></tr>")
            .append($("<th></th>").text(String(data["game"]["game_id"][i])))
            .append($("<th></th>").text(String(data["game"]["team"][i])))
            .append($("<th></th>").text(String(data["game"]["uplayid"][i])))
            .append($("<th></th>").text(String(data["game"]["score"][i])))
            .append($("<th></th>").text(String(data["game"]["kill"][i])))
            .append($("<th></th>").text(String(data["game"]["assist"][i])))
            .append($("<th></th>").text(String(data["game"]["death"][i])))
        );
    }
    $("#score").append(tbody);
    $("#score").DataTable();
}

function loadResult(text) {
    var data = makeDict(text);
    drawGameTable(data);
    drawRoundTable(data);
    drawScoreTable(data);
}

$(function() {
    /*
    $.extend($.fn.dataTable.defaults, {
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Japanese.json"
        }
    });
    */
    var csv_url = getParam("url");
    if (csv_url) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            loadResult(xhr.responseText);
        }
        xhr.open("get", decodeURI(csv_url), true);
        xhr.send(null);
    }
    $("#drop-zone").on("drop", function(e) {
        e.preventDefault();
        var $result_zone = $("#result-zone");
        var files = e.originalEvent.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            loadResult(e.target.result);
        }
        reader.readAsText(files, "UTF-8");
    }).on("dragenter", function() {
        return false;
    }).on("dragover", function() {
        return false;
    });
});