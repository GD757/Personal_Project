"""
URL configuration for meeting_space_planner project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from accounts.views import SignUp
from accounts.views import Login
from accounts.views import Logout
from events.views import EventList
from events.views import EventDetail
from rooms.views import RoomList
from rooms.views import RoomDetail
from accounts.views import Info


urlpatterns = [ #add api/
    path('admin/', admin.site.urls),
    path('api/signup/', SignUp.as_view(), name='signup'),
    path('api/login/', Login.as_view(), name='login'),
    path('api/logout/', Logout.as_view(), name='logout'),
    # path('api/', include('api.urls')), If putting api from frontend to backend
    path('api/events/', EventList.as_view(), name='event-list-create'),
    path('api/events/<int:id>/', EventDetail.as_view(), name='event-detail'),
    path('api/rooms/', RoomList.as_view(), name='room-list-create'),
    path('api/rooms/<int:id>/', RoomDetail.as_view(), name='room-detail'),
    path('api/user/', Info.as_view(), name='user')
]


