<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request) {
        $validator = Validator::make($request->all(),[ 
            'email' => 'required',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return response()->json(['validationError' => $validator->messages()->toJson()], 422);
        }
        
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = $request->user()->createToken('token')->plainTextToken;
            return response()->json(['token' => $token]);
        }

        return response()->json(['message' => 'Login failed'], 401);
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(),[ 
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if($validator->fails()){
            return response()->json(['validationError' => $validator->messages()->toJson()], 422);
        }
    
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        if($user) {
            Auth::login($user);
            $token = $user->createToken('token')->plainTextToken;
            return response()->json(['token' => $token]);
        }

        return response()->json(['message' => 'Registration Failed!']);
    }
}
