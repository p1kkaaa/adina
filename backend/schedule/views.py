from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiParameter, OpenApiExample
from drf_spectacular.openapi import AutoSchema

from .models import Schedule, Reminder
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    ScheduleSerializer,
    ReminderSerializer,
)

User = get_user_model()


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    @extend_schema(
        request=RegisterSerializer,
        responses={
            status.HTTP_201_CREATED: OpenApiResponse(
                response=UserSerializer,
                description="User created successfully",
            ),
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(
                description="Invalid input data",
            ),
        },
        description="Register a new user",
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": UserSerializer(user).data,
                "message": "User created successfully",
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
    @extend_schema(
        request=CustomTokenObtainPairSerializer,
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                response=CustomTokenObtainPairSerializer,
                description="Token obtained successfully",
            ),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
                description="Invalid credentials",
            ),
        },
        description="Obtain JWT token pair (access + refresh)",
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class UserViewSet(viewsets.GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        description="Get current user details",
        responses={
            status.HTTP_200_OK: UserSerializer,
        }
    )
    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class ScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='id',
                type=int,
                location=OpenApiParameter.PATH,
                description='Schedule ID'
            )
        ]
    )
    def get_queryset(self):
        return Schedule.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReminderViewSet(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='id',
                type=int,
                location=OpenApiParameter.PATH,
                description='Reminder ID'
            )
        ]
    )
    def get_queryset(self):
        return Reminder.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)