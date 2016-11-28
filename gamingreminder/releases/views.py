from django.template import loader, Context
from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView, View
from django.http import HttpResponse

from . import services


# Create your views here.

# Class based views
class HomePage(TemplateView):
    def get(self, request):
        # Filter by offset = 0, platform = all and region = worldwide
        games = services.get_games(0, 0, 0)
        return render(request, 'releases/game_list.html', {'games': games})

    def post(self, request):
        # If ajax request get the parameters and filter then send the new stuff back
        if request.is_ajax():
            offset = request.POST['offset']
            platform_id = request.POST['platformID']
            region_id = request.POST['regionID']
            games = services.get_games(int(offset), int(platform_id), int(region_id))
            template = loader.get_template('releases/sub_game_list.html')
            context = {"games": games}
            rendered_content = template.render(context)
            return HttpResponse(rendered_content)


def game_detail(request, pk):
    games = services.get_game(pk)
    # One json object in one json array
    return render(request, 'releases/game_detail.html', {"game": games[0]})































# Function based views

"""
def ajax_view(request):
    if request.is_ajax():
        offset = request.POST['offset']
        #games = services.get_games(1, None)  # Don't filter by platform
        template = loader.get_template('releases/sub_game_list.html')
        context = {"games": games}
        rendered_content = template.render(context)
        # Sending a rendered template
        return HttpResponse(rendered_content)
    return HttpResponse("Get out!! 404")


# Offset gets incremented in the ajax's call
def get_games_with_platform(request, pk):
    #games = services.get_games(0, pk)
    return render(request, 'releases/game_list.html', {'games': games})



"""
