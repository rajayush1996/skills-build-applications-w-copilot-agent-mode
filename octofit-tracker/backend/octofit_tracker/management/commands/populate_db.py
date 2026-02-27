from django.core.management.base import BaseCommand
from django.conf import settings

import pymongo

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = pymongo.MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        for col in ['users', 'teams', 'activities', 'leaderboard', 'workouts']:
            db[col].drop()

        # Create unique index on email for users
        db['users'].create_index([('email', 1)], unique=True)

        # Sample users
        users = [
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'marvel'},
            {'name': 'Captain America', 'email': 'cap@marvel.com', 'team': 'marvel'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'dc'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'dc'},
        ]
        db['users'].insert_many(users)

        # Sample teams
        teams = [
            {'name': 'marvel', 'members': ['ironman@marvel.com', 'cap@marvel.com']},
            {'name': 'dc', 'members': ['wonderwoman@dc.com', 'batman@dc.com']},
        ]
        db['teams'].insert_many(teams)

        # Sample activities
        activities = [
            {'user': 'ironman@marvel.com', 'activity': 'running', 'duration': 30},
            {'user': 'batman@dc.com', 'activity': 'cycling', 'duration': 45},
        ]
        db['activities'].insert_many(activities)

        # Sample leaderboard
        leaderboard = [
            {'team': 'marvel', 'points': 100},
            {'team': 'dc', 'points': 90},
        ]
        db['leaderboard'].insert_many(leaderboard)

        # Sample workouts
        workouts = [
            {'user': 'cap@marvel.com', 'workout': 'pushups', 'reps': 50},
            {'user': 'wonderwoman@dc.com', 'workout': 'squats', 'reps': 60},
        ]
        db['workouts'].insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
