// グローバル変数
var s_width = 800;
var s_height = 700;
var play_width = 300;
var play_height = 600;
var block_size = 30;

var top_left_x = Math.floor((s_width - play_width) / 2);
var top_left_y = s_height - play_height;

// テトリミノの形状
var S = [['.....',
      '.....',
      '..00.',
      '.00..',
      '.....'],
     ['.....',
      '..0..',
      '..00.',
      '...0.',
      '.....']];

// 省略...

// クラス定義
class Piece {
    constructor(column, row, shape) {
        this.x = column;
        this.y = row;
        this.shape = shape;
        this.color = shape_colors[shapes.indexOf(shape)];
        this.rotation = 0;
    }
}

// 省略...

// メイン関数
function main(win) {
    var last_score = max_score();
    var locked_positions = {};
    var grid = create_grid(locked_positions);

    var change_piece = false;
    var run = true;
    var current_piece = get_shape();
    var next_piece = get_shape();
    var clock = new Date();
    var fall_time = 0;
    var fall_speed = 0.27;
    var level_time = 0;
    var score = 0;

    while (run) {
        grid = create_grid(locked_positions);
        fall_time += clock.getTime();
        level_time += clock.getTime();
        clock = new Date();

        // 省略...

        if (check_lost(locked_positions)) {
            draw_text_middle(win, "YOU LOST!", 80, (255,255,255));
            setTimeout(function() {
                run = false;
                update_score(score);
            }, 1500);
        }
    }
}

// 省略...

// ゲーム開始
var win = document.getElementById('gameCanvas');
main_menu(win);
