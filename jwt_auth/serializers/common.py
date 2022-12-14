from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation, hashers
from django.core.exceptions import ValidationError


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        print('user serializer data =>', data)
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        if password != password_confirmation:
            raise ValidationError({
                'password_confirmation': 'does not match the password field'
            })
        password_validation.validate_password(password)
        data['password'] = hashers.make_password(password)
        print('here from validate')
        return data

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name',
                  'profile_image', 'password', 'password_confirmation', 'wallet')


class PartialUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name',
                  'profile_image', 'wallet')
