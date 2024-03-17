from rest_framework import serializers

from main.models import Task, Theme
from users.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'ip',
        )


class ThemeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Theme
        fields = '__all__'


class TaskGetSerializer(serializers.ModelSerializer):
    performer = UserSerializer()
    theme = ThemeSerializer()

    class Meta:
        model = Task
        fields = '__all__'


class TaskPostPutPatchDeleteSerializer(serializers.ModelSerializer):
    performer = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field='username',
        required=False,
    )
    theme = serializers.SlugRelatedField(
        queryset=Theme.objects.all(),
        slug_field='slug',
    )
    author = UserSerializer(
        read_only=True
    )

    class Meta:
        model = Task
        fields = '__all__'
