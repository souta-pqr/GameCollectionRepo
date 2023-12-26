import turtle

# 新しいウィンドウを開く
window = turtle.Screen()
window.bgcolor("white")

# 新しいタートルを作成する
my_turtle = turtle.Turtle()
my_turtle.color("black")

# ウィンドウの更新を一時停止
turtle.tracer(0)

# 四角形を描く
for _ in range(4):
    my_turtle.forward(100)
    my_turtle.right(90)

# ウィンドウの更新を再開
turtle.update()

# ウィンドウが閉じるまで待つ
turtle.done()
