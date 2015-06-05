<?php

class Explanation {

    private $id;
    private $private;
    private $seller_name;
    private $email;
    private $allow_mails = ' ';
    private $phone;
    private $location_id;
    private $category_id;
    private $title;
    private $description;
    private $price;
    private $time;

    public function __construct($exp) {
        if (isset($exp['id'])) {
            $this->id = $exp['id'];
        }
        $this->seller_name = $exp['seller_name'];
        $this->email = $exp['email'];
        $this->allow_mails = $exp['allow_mails'];
        $this->phone = $exp['phone'];
        $this->location_id = $exp['location_id'];
        $this->category_id = $exp['category_id'];
        $this->title = $exp['title'];
        $this->description = $exp['description'];
        $this->price = $exp['price'];
        $this->time = $exp['time'];
    }

    public function save() {
        global $mysqli;
        $vars = get_object_vars($this);
        $rep = $mysqli->query('REPLACE INTO explanations(?#) VALUES(?a)', array_keys($vars), array_values($vars));
        if ($rep > 0) {
            $result['status'] = 'success';
            
            if ($vars['id'] ==''){
                $q = $mysqli->selectrow('SELECT max(id) FROM explanations');
                $result['newExp'] = true;
                $result['id'] = $q['max(id)'];
                $result['message'] = "Объявление #".$result['id']." успешно добавлено.";
            } else{
                $result['id'] = $vars['id'];
                $result['newExp'] = false;
                $result['message'] = "Объявление #".$result['id']." успешно изменено.";
            }
        } else {
            $result['status'] = 'error';
            $result['message'] = "Объявление не было добавлено.";
        }
        
        return $result;
    }

    public function getValue() {
        return get_object_vars($this);
    }

    public function getId() {
        return $this->id;
    }

    public static function deleteExp($id) {
        global $mysqli;
        $del = $mysqli->selectrow("DELETE FROM explanations WHERE id = ?d", $id);
        
        if ($del > 0) {
            $result['status'] = 'success';
            $result['message'] = "Объявление #$id успешно удалено.";
        } else {
            $result['status'] = 'error';
            $result['message'] = "Объявление не было удалено.";
        }
        return $result;
    }

    // Обработка входящего объявления
    public static function prepareQuery($exp, $id) {
        $exp['id'] = $id;
        if (isset($exp['button_add'])) {
            unset($exp['button_add']);
        }
        foreach ($exp as $key => &$value) {
            $query[$key] = strip_tags($value);
        }
        $query['price'] = (float) $query['price'];
        $query['time'] = Date('d.m.Y H:i:s', time());
        return $query;
    }

}

class CorporateExplanation extends Explanation {

//    private $private;
    private $status;

    public function __construct($exp) {
        parent::__construct($exp);
        $this->private = '1';
//        $this->status = $stat;
    }

    public function getStatus() {
        return $this->status;
    }

}

class PrivateExplanation extends Explanation {

//    private $private;

    public function __construct($exp) {
        parent::__construct($exp);
        $this->private = '0';
    }

}
