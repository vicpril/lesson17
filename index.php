<?php

include 'config.php';
include 'lib/notice_board.php';
include 'lib/explanation.php';

$instance = Notice_board::instance()->getAllExpFromDB()->getListOfExplanations()->display();
