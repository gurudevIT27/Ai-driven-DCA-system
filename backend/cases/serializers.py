from django.contrib.auth.models import User
from rest_framework import serializers


class SignupSerializer(serializers.ModelSerializer):
    # Password should never be returned in responses
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "username",
            "password"
        ]

    def validate_email(self, value):
        """
        Ensure email is unique
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value

    def validate_username(self, value):
        """
        Ensure username is unique
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def create(self, validated_data):
        """
        Create user with encrypted password
        """
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"]
        )
        return user
from rest_framework import serializers
from .models import Case


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = [
            "customer_id",
            "outstanding_amount",
            "overdue_days",
            "assigned_dca",
            "recovery_prediction",
            "status",
        ]
