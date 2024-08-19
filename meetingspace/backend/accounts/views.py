from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED,
    HTTP_200_OK,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import logging
from .serializer import UserSerializer

logger = logging.getLogger(__name__)

class SignUp(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = User.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        return Response(
            {"user": user.email, "token": token.key}, status=HTTP_201_CREATED
        )
    
    
class Login(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            userdata = UserSerializer(user).data
            logger.info(f"User: {user.email}, Token: {token.key}")
            return Response({"token": token.key, "user": userdata}, status=HTTP_200_OK)

        else:
            return Response({"error": "Invalid credentials"}, status=HTTP_401_UNAUTHORIZED)
        
class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
class Info(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=HTTP_200_OK)