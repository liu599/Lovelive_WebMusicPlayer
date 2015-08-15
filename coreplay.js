$(document).ready(function() {
	var $ = jQuery.noConflict();
	listStatus = 0;
	$('.jp-volume-controls').css({
	    'display':'none'
	});
	$('.list-button').click(function() {
		listWidth = $('#dropdownprac').width();
		if (!listStatus) {
			$('#dropdownprac').show();

			$('#dropdownprac').animate({
				marginRight: 0
			}, 300);
			listStatus = 1;
		} else {
			$('#dropdownprac').hide();

			$('#dropdownprac').animate({
				marginRight: -350
			}, 300);
			listStatus = 0;
		}
	});
	$patternNumber = 1;
	// Music Player


	// 载入播放列表
	$.getScript("https://blog.nekohand.moe/static/AnimesongLLdata.js", function($playslist, textStatus, jqxhr) {
		$urlb = $default;
		console.log("数据载入完毕/Load was performed");
		// 播放器主程序
		$("#jquery_jplayer_1").jPlayer({
			ready: function(event) {

				playmusic(2);
				var repeatButtonSele = document.getElementById("repeatButton");
				repeatButtonSele.addEventListener("click", function(event) {
					if (!$("#repeatButton").hasClass('active')) {
						$("#jquery_jplayer_1").jPlayer("option", "loop", true);
						$("#repeatButton").addClass("active");
						$("#jPlayerShufflePattern").removeClass("active");
						$("#repeatPlayPattern").removeClass("active");
						console.log("单曲循环已经开启");
					} else {
						$("#jquery_jplayer_1").jPlayer("option", "loop", false);
						$patternNumber = 1;
						console.log("单曲循环已经关闭");
						//alert($("#jquery_jplayer_1").jPlayer("option","loop"));
						$("#repeatButton").removeClass("active");
						$("#jPlayerShufflePattern").addClass("active");
					}

				});

				var repeatPlayPatternSele = document.getElementById("repeatPlayPattern");
				repeatPlayPatternSele.addEventListener("click", function(event) {

					if (!$("#repeatPlayPattern").hasClass('active')) {
						$patternNumber = 3;
						$("#repeatPlayPattern").addClass("active");
						$("#jPlayerShufflePattern").removeClass("active");
						$("#repeatButton").removeClass("active");
						$("#jquery_jplayer_1").jPlayer("option", "loop", false);
						console.log("顺序播放");
					} else {
						$patternNumber = 1;
						$("#repeatPlayPattern").removeClass("active");
						$("#jPlayerShufflePattern").addClass("active");
						console.log("播放单曲停止");

					}


				});
				
				var randomPlayPattern = document.getElementById("jPlayerSufflePattern");
				randomPlayPattern.addEventListener("click", function(event) {
					if (!$("#jPlayerSufflePattern").hasClass('active')) {
						$patternNumber = 1;
						$("#jPlayerSufflePattern").addClass("active");
						$("#repeatPlayPattern").removeClass("active");
						$("#repeatButton").removeClass("active");
						$("#jquery_jplayer_1").jPlayer("option", "loop", false);
						console.log("默认播放模式");
					} 
				});
				
			},
			play: function() {
				// $("#jquery_jplayer_1").jPlayer("volume", 0.5);
				var oDiv = document.getElementById("playx");
				oDiv.innerHTML = "<div class=\"pause\"  ><i class=\"icon-pause\"></i></div>";
				$('.jp-progress').fadeIn(100);
				$("#album").addClass("loading");
				outputLyrics();

			},
			pause: function() {
				var oDiv = document.getElementById("playx");
				oDiv.innerHTML = "<div class=\"play\" ><i class=\"icon-play\"></i></div>";
				$("#album").removeClass("loading");
			},
			ended: function(event) {
				//$("#jquery_jplayer_1").jPlayer("options","loop",true);
				$('.jp-progress').fadeOut(200);
				//alert(event.jPlayer.options.loop);
				if (event.jPlayer.options.loop) {

					$("#jquery_jplayer_1").jPlayer("play");

				} else {
					$("button.jp-next").click();
				}
			},
			solution: "html, flash",
			swfPath: "../jPlayer",
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: false,
			keyEnabled: true,
			remainingDuration: false,
			toggleDuration: false
		});
		// 播放列表下拉菜单
		loadmusiclist();
	});

	// 播放动作
	$("button.jp-next").click(function() {

		playmusic($patternNumber);
	});

	$("button.jp-prev").click(function() {
		if ($patternNumber == 3) {
			playmusic(4);
		} else {
			playmusic($patternNumber);
		}
	});

    var volumeControl = document.getElementById("jPlayerSoundSlider");
    volumeControl.addEventListener("click", function(event) {
         if(!$('#jPlayerSoundSlider').hasClass('active')){
             $('.jp-volume-controls').css({
	        'display':'block',
	        'top': $('#jPlayerSoundSlider').position().top,
	        'left': event.screenX+25+'px'
	          });
	         $('#jPlayerSoundSlider').addClass('active');
	        // console.log(event.screenY);
	        // console.log(event.screenX);
         }else{
             $('#jPlayerSoundSlider').removeClass('active');
             $('.jp-volume-controls').css({
	        'display':'none'
	          });
         }
         
        
    });
});

function loadmusiclist() {
	var txtAll = '';
	for (var ipp = 0, il = $playslist.length; ipp < il; ipp++) {
		var musictitle = $playslist[ipp].title;
		if ($playslist[ipp].title !== undefined) {
			var txt0 = '<li role="presentation" class="musemusic" id="menuitems-' + ipp + '"><a role="menuitem" tabindex="-1" href="#">' + ipp + ':' + musictitle + '</a></li>';
			txtAll = txtAll + txt0;
		}
	}
	var drop = document.getElementById("dropdownprac");
	drop.innerHTML = txtAll;
	for (ipp = 0, il = $playslist.length; ipp < il; ipp++) {
		var idexname = "menuitems-" + ipp;
		var dropcc = document.getElementById(idexname);
		dropcc.addEventListener("click", function() {
			//alert("Selected Option:"+$(this).text());
			var $ = jQuery.noConflict();
			var selectednumber = $(this).text().split(":");
			//alert(selectednumber[0]);
			$number = selectednumber[0];
			//console.log($number);
			// Background pictures


			$("#jquery_jplayer_1").jPlayer("setMedia", $playslist[$number]);
			$("#jquery_jplayer_1").jPlayer("play");
			if ($playslist[$number].poster) {
				$urlb = $playslist[$number].poster;
			} else {
				$urlb = $default;
			}
			$('#album').html("<img src=" + $urlb + ' alt="404NotFound">');
			var urlc = $playslist[$number].lrc;
			console.log('Lovelive播放器 ver 1.0 by eddie32');
			console.log('歌曲名称:' + $playslist[$number].title);
			console.log('歌曲mp3地址:' + $playslist[$number].mp3);
			console.log('封面地址:' + $playslist[$number].poster);
			console.log('歌词文件地址:' + urlc);
			//建立一个XMLHttpRequest请求
			var request = new XMLHttpRequest();
			if (request === null) {
				console.log("XMLHttpRequest is not ready");
			} else {
				request.open('GET', urlc, true);
				request.responseType = 'text';
				var lyric = 'default';
				request.onload = function() {
					$lrcreturn = parseLyricss(request.response);
					//console.log($lrcreturn);
				};
				request.send();
			}

		});
	}
}




function parseLyricss(text) {
	//将文本分隔成一行一行，存入数组
	var lines = text.split('\n'),
		//用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
		pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
		//保存最终结果的数组
		result = [];
	//去掉不含时间的行
	while (!pattern.test(lines[0])) {
		lines = lines.slice(1);
	}
	//上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
	lines[lines.length - 1].length === 0 && lines.pop();
	lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
		//提取出时间[xx:xx.xx]
		var time = v.match(pattern),
			//提取歌词
			value = v.replace(pattern, '');
		if (time === null) {
			alert(v);
		}
		//因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
		time.forEach(function(v1, i1, a1) {
			//去掉时间里的中括号得到xx:xx.xx
			var t = v1.slice(1, -1).split(':');
			//将结果压入最终数组
			result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
		});

	});
	//最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
	result.sort(function(a, b) {
		return a[0] - b[0];
	});
	result[0][1] = '<div id="lrc-' + 0 + '"><b style="color:#fff">' + result[0][1] + '</b></div>';
	for (var i = 1; i <= result.length; i++) {

		if (result[i] !== undefined && result[i + 1] !== undefined) {
			result[i][1] = '<div id="lrc-' + i + '"><b style="color:#fff">' + result[i][1] + '</b></div>';
			if (result[i + 1][0] == result[i][0]) {
				result[i + 1][1] = result[i][1] + '<div id="lrc-' + i + '"><b style="color:#fff">' + result[i + 1][1] + '</b></div>';
				result.splice(i, 1);
				i--;
			}
		}
	}
	result[result.length - 1][1] = '<div id="lrc-last' + '"><b style="color:#fff">' + result[result.length - 1][1] + '</b></div>';


	return result;
}

function playmusic(patternumber) {
	var $ = jQuery.noConflict();
	// Background pictures


	//console.log($playslist.length);
	if (patternumber == 1) {
		$number = parseInt(Math.random() * ($playslist.length - 0 + 1) + 0);
		$("#jquery_jplayer_1").jPlayer("setMedia", $playslist[$number]);
		$("#jquery_jplayer_1").jPlayer("play");

	} else if (patternumber == 2) {
		$number = 56;
		$("#jquery_jplayer_1").jPlayer("setMedia", $playslist[$number]);
		//  $("#jquery_jplayer_1").jPlayer("play");
	} else if (patternumber == 3) {
		$number = parseInt($number) + 1;
		//console.log($number);
		if ($number >= $playslist.length) {
			$number = 0;
		}
		$("#jquery_jplayer_1").jPlayer("setMedia", $playslist[$number]);
		$("#jquery_jplayer_1").jPlayer("play");
	} else if (patternumber == 4) {
		$number = parseInt($number) - 1;
		//console.log($number);
		if ($number <= 0) {
			$number = $playslist.length - 1;
		}
		$("#jquery_jplayer_1").jPlayer("setMedia", $playslist[$number]);
		$("#jquery_jplayer_1").jPlayer("play");
	}
	if ($playslist[$number].poster) {

		$urlb = $playslist[$number].poster;

	} else {
		$urlb = $default;
	}
	$('#album').html("<img src=" + $urlb + ' alt="404NotFound">');
	var urlc = $playslist[$number].lrc;
	console.log('Lovelive播放器 ver 1.0 by eddie32');
	console.log('歌曲名称:' + $playslist[$number].title);
	console.log('歌曲mp3地址:' + $playslist[$number].mp3);
	console.log('封面地址:' + $playslist[$number].poster);
	console.log('歌词文件地址:' + urlc);
	//建立一个XMLHttpRequest请求
	var request = new XMLHttpRequest();
	if (request === null) {
		console.log("XMLHttpRequest is not ready");
		return;
	} else {
		request.open('GET', urlc, true);
		request.responseType = 'text';
		var lyric = 'default';
		request.onload = function() {
			$lrcreturn = parseLyricss(request.response);
		};
		request.send();
	}
}

function outputLyrics() {
	//显示歌词的元素

	var lyricContainer = document.getElementById("out");
	var audio1 = document.getElementById("jp_audio_0");

	audio1.ontimeupdate = function(e) {
		//监听ontimeupdate事件

		for (var i = 0, l = $lrcreturn.length; i < l; i++) {
			if (audio1.currentTime > $lrcreturn[i][0]) {
				//lrclabel = "#lrc-"+i;
				// console.log(lrclabel);
				//$(lrclabel).addClass("lrcloading");
				lyricContainer.innerHTML = $lrcreturn[i][1];
			}

		}

	};

}
