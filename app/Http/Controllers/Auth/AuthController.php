<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Auth, JWTAuth, Validator;
use App\Http\Requests\StoreUserRequest;

class AuthController extends Controller
{
    /**
     * Make authenticate user
     *
     * @return \Illuminate\Http\Response
     */
    public function authenticate($credentials){
        try {
            if (! $token = auth()->attempt($credentials)) {
                return response()->json(['success' => false, 'error' => 'Dados inválidos. Por favor, certifique-se que foi inserida a informação correta.'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'error' => 'could_not_create_token'], 500);
        }
        return response(['success' => true, 'data'=> [ 'token' => $token ]], 200)->header('Authorization', $token);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];

        $input = $request->only('email', 'password');

        $validator = Validator::make($input, $rules);

        if ($validator->fails()) {
            $error = $validator->messages()->toJson();
            return response()->json(['success'=> false, 'error'=> $error]);
        }

        return $this->authenticate([
            'email' => $request->email,
            'password' => $request->password,
        ]);
    }
    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request)
    {
        auth()->logout();
        return response([
            'status' => 'success',
            'msg' => 'Logged out Successfully.'
        ], 200);
    }
    public function user(Request $request)
    {
        return response()->json(['data' => auth()->user()]);
    }

    /**
     * Register a newly user resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ];
        $input = $request->only('name', 'email', 'password');
        $validator = Validator::make($input, $rules);
        if ($validator->fails()) {
            $error = $validator->messages()->toJson();
            return response()->json(['success'=> false, 'error' => $error]);
        }
        if( User::where('email', $request->email)->first() ){
            return $this->authenticate([
                'email' => $request->email,
                'password' => $request->password,
            ]);
            return $this->authenticateUser($request->email);
        }
        $userModel = new User();
        $payload = array_only($request->all(), $userModel->getFillable());
        $payload['password'] = bcrypt($payload['password']);
        $user = $userModel->create($payload);

        return $this->authenticate([
            'email' => $request->email,
            'password' => $request->password,
        ]);
    }

     /**
     * API Recover Password
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function recover(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $error_message = "Seu endereço de email não foi encontrado.";
            return response()->json(['success' => false, 'error' => ['email'=> $error_message]], 401);
        }

        try {
            Password::sendResetLink($request->only('email'), function (Message $message) {
                $message->subject('Foi enviado um link para resetar a senha!');
            });
        } catch (\Exception $e) {
            //Return with error
            $error_message = $e->getMessage();
            return response()->json(['success' => false, 'error' => $error_message], 401);
        }

        return response()->json([
            'success' => true, 'data'=> ['msg'=> 'Um link para resetar a senha foi enviado! Por favor verifique seu email.']
        ]);
    }
     /**
     * API Recover Password
     *
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        try {
            return response([
                'status' => 'success'
            ])->header('Authorization', auth()->refresh());
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'error' => 'token_expired'], 401);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => 'could_not_refresh_token'], 401);
        }

    }
}
