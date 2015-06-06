<form class="form-horizontal form-group-sm" method="post" 
      accept-charset="utf-8" 
      {*onsubmit="return false;"*} >

    <input hidden class="clear_form" name="id" value="{$name.id|default:''}">
    
    <div class="form-group ">
        <div class="">
            <div class="radio">
                <label>
                    <input class="set_form" type="radio" name="private" value="0" {if !isset($name.private) || $name.private == 0}checked{/if}>Частное лицо
                </label>
            </div>
            <div class="radio">
                <label>
                    <input class="set_form" type="radio" name="private" value="1" {if $name.private == 1}checked{/if}>Компания
                </label>   
            </div>
        </div>
    </div>

    <div class="form-group ">
        <label class="text-left"><b>Ваше имя</b></label>
        <div class="">
            <input class="clear_form s_name form-control" type="text" maxlength="40" value="{$name.seller_name|default:''}" name="seller_name" required>
        </div>
    </div>

    <div class="form-group">
        <label class="text-left">Электронная почта</label>
        <div class="">
            <input class="clear_form email form-control" type="text" value="{$name.email|default:''}" name="email">
        </div>
    </div>

    <div class="form-group">
        <div class="">
            <div class="checkbox">
                <label>
                    <input type='hidden' value=' ' name="allow_mails">
                    <input class="set_form" type="checkbox" value="checked" name="allow_mails" {$name.allow_mails|default:' '}>
                    Я не хочу получать вопросы по объявлению по e-mail
                </label>
            </div>
        </div>
    </div>

    <div class="form-group">
        <label class="text-left">Номер телефона</label>
        <div class="">
            <input class="clear_form phone form-control" type="text" maxlength="11" value="{$name.phone|default:''}" name="phone">
        </div>
    </div>

    <div class="form-group">
        <label class="text-left">Город</label>
        <div class="">
            <select class="set_form form-control" name=location_id title="Выберите Ваш город">
                <option disabled="disabled">-- Города --</option>
                {html_options options=$cities selected=$name.location_id|default:''}
            </select>
        </div>
    </div>

    <div class="form-group">
        <label class="text-left">Категория</label>
        <div class="">
            <select class="set_form form-control" name=category_id title="Выберите категорию объявления">
                <option value="">-- Выберите категорию --</option>
                {html_options  options=$categories selected=$name.category_id|default:''}
            </select>
        </div>
    </div>

    <div class="form-group">
        <label class="text-left">Название объявления</label>
        <div class="">
            <input class="clear_form title form-control" type="text" maxlength="50" value="{$name.title|default:''}" name="title" required> 
        </div>
    </div>

    <div class="form-group">
        <label class="text-left">Описание объявления</label> 
        <div class="">
            <textarea class="clear_form des form-control" maxlength="3000" name="description">{$name.description|default:''}</textarea> 
        </div>
    </div>

    <div class="form-group"> 
        <label class="text-left">Цена</label> 
        <div class="">
            <div class="input-group">
                <input class="clear_form price form-control" type="text" maxlength="9" value="{$name.price|default:'0'}" name="price">
                <span class="input-group-addon">.руб</span>
            </div>
        </div>  
    </div>

    <div id="accept" class="form-group">

       
            <div>
                <input class="add btn btn-info" type="submit" name="button_add" value="Подать объявление">
                <input class="cancel btn btn-default" type="button" style="display: done" value="Отмена">
            </div>
        

    </div>
    <br>
</form>  
