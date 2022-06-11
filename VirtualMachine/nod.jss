in 1
in 2
pr 0 9
pr 1 3
if< 1 2 )
sum 1 9 3
sum 2 9 1
sum 3 9 2 
)
pr 0 9
if< 1 9 @
pr -1 9
umn 1 9 1
@
pr 0 3
pr 1 4
pr 1 7
pr 1 8
if== 1 2 (
if== 1 9 )
pr Error 7
)
(
:M
if<= 4 1 )
mod 2 4 5
mod 1 4 6
if== 5 3 (
if== 6 3 +
sum 4 3 7
+
(
sum 4 8 4
goto :M
)
out 7
