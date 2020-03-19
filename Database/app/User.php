<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    protected $table = 'user';
    protected $keyType = 'string';
    protected $primaryKey = 'kodeuser';
    protected $fillable = [
        'kodeuser', 'name', 'password', 'email', 'gender', 'loggedIn'
    ];
}